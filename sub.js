// Imports the Google Cloud client library
const PubSub = require('@google-cloud/pubsub');

// Your Google Cloud Platform project ID
const projectId = 'yourprojectid';

// Instantiates a client
const pubsubClient = PubSub({
    projectId: projectId
});

// The name for the new topic
const topicName = 'topic-test';
var topic = pubsubClient.topic(topicName);
console.log(topic.name);


function sub(name, no) {
    var subscription = topic.subscription(name);
    console.log(subscription.name);
    subscription.on('message', (data) => {
        console.log(name, no, "received", data.attributes);
        subscription.ack(data.ackId)
    });
}

sub("my-subscription1", 100);
sub("my-subscription1", 200);
