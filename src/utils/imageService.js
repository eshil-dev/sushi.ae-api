import AWS from 'aws-sdk';

const BUCKET_NAME = 'sushi-images-bucket'
const ACCESS_KEY_ID = 'AKIATW65PWY2LLGUBG5P'
const SECRET_ACCESS_KEY = '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'
const AWS_REGION = 'ap-south-1'

const credentials = {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: AWS_REGION
}

export const uploadToS3 = async (imageName, base64Image) => {

    AWS.config.update(credentials);

    const s3 = new AWS.S3()

    const imageBuffer = new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const type = base64Image.split(';')[0].split('/')[1];

    const params = {
        Bucket: BUCKET_NAME,
        Key: `${imageName}.${type}`, // type is not required
        Body: imageBuffer,
        ACL: 'public-read',
        ContentEncoding: 'base64', // required
        ContentType: `image/${type}` // required. Notice the back ticks
    }

    let location = '';

    try {
        const { Location } = await s3.upload(params).promise();
        location = Location;
    } catch (error) {
        console.log(error)
    }

    return location;

}
