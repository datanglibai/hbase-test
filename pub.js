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

//Creates the new topic
// pubsubClient.createTopic(topicName, (err, topic) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(topic.name);
//   console.log(`Topic ${topic.name} created.`);
//   var subscription1 = topic.subscription('my-subscription1');
//   subscription1.create();
//   console.log(subscription1.name);

//   var subscription2 = topic.subscription('my-subscription2');
//   subscription2.create();
//   console.log(subscription2.name);
// });

var topic = pubsubClient.topic(topicName);
var message = {
  data: {
    userId: 3,
    product: 'book',
    event: 'rent'
  },
  attributes: {
    key: 'value',
    hello: 'world'
  }
};

var options = {
  raw: true
};

for (var i = 0; i < 10; i++) {
  publish();
}

function publish(){
  topic.publish(message, function (err, messageIds, apiResponse) {
    console.log(messageIds);

  });
 // setTimeout(publish, 3000);
}




