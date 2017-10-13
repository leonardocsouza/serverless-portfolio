import StringIO
import zipfile
import boto3
import mimetypes

def handler(event, context):
    # To notify of successfull deploy
    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:us-east-1:737274848372:deployPortfolioTopic')

    location = {
        'bucketName': 'portfoliobuild.leonardocsouza.com',
        'objectKey': 'portfoliobuild.zip'
    }

    # check if we received param through CodePipeline invocation
    job = event.get('CodePipeline.job')

    try:
        # To download from build bucket and unzip into portfolio bucket

        if job:
            for artifact in job['data']['inputArtifacts']:
                if artifact['name'] == 'MyAppBuild':
                    location = artifact['location']['s3Location']

        print 'Building porfolio from', location

        s3 = boto3.resource('s3')
        portfolio_bucket = s3.Bucket('portfolio.leonardocsouza.com')
        build_bucket = s3.Bucket(location['bucketName'])

        portfolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj(location['objectKey'], portfolio_zip)

        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj, nm,
                    ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')

        print 'Job done!'
        topic.publish(Subject='Portfolio Deployed', Message='Portfolio deployed!')

        # Notify that job was completed if it came from CodePipeline
        if job:
            codepipeline = boto3.client('codepipeline')
            codepipeline.put_job_success_result(jobId=job['id'])
    except:
        topic.publish(Subject='Portfolio Deploy Failed', Message='It did not work')

        # Notify that job failed if it came from CodePipeline
        if job:
            codepipeline = boto3.client('codepipeline')
            codepipeline.put_job_failure_result(jobId=job['id'],
                failureDetails={'type':'JobFailed', 'message':'failed'})
        raise

    return 'Completed lambda function'