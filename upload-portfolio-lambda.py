import StringIO
import zipfile
import boto3
import mimetypes

def handler(events, context):
    # To notify of successfull deploy
    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:us-east-1:737274848372:deployPortfolioTopic')

    try:
        # To download from build bucket and unzip into portfolio bucket
        s3 = boto3.resource('s3')
        portfolio_bucket = s3.Bucket('portfolio.leonardocsouza.com')
        build_bucket = s3.Bucket('portfoliobuild.leonardocsouza.com')

        portfolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj('portfoliobuild.zip', portfolio_zip)

        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj, nm,
                    ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')

        print 'Job done!'
        topic.publish(Subject='Portfolio Deployed', Message='Portfolio deployed!')
    except:
        topic.publish(Subject='Portfolio Deploy Failed', Message='It did not work')
        raise

    return 'Completed lambda function'