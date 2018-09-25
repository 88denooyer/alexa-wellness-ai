/* eslint-disable  func-names */
/* eslint-disable  no-console */


// creates Alexa object
const Alexa = require('ask-sdk-core');


// the launch request comes from the init request to alexa from user
// launch is the "open <function-name>"" request within the alexa interface
// the launch is going to evolve to something other than just a hello world / waddup andy
// the launch handler will need to evolve to an initial greeting which will ask what is needed
// we're not gonna be able to do something like alexa help me do x, y, z
// we're gonna have to do something where the user says "open <function-name>" and then
// the user makes the requests after the greeting response from alexa
const LaunchRequestHandler = {
  // Handle initialization
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    // defines what will be said
    // since this is in JS, the constant acts as a string
    // does not perform the speech 
    const speechText = 'What kind of help do you need today?';

    // returns this when LaunchRequestHandler is invoked further down
    return handlerInput.responseBuilder
      .speak(speechText)  // speak command for the constant speechText
      .reprompt(speechText)  // not sure what this does... haven't replicated this
      .withSimpleCard('What do you need help with?', speechText) // writes to SCREEN
      .getResponse(); // waits for response
  },
};
//=================================================================================
// main intent handler
const HamstringIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HamstringIntent';
  },
  handle(handlerInput) {
    const speechText = 'Here\'s a stretch for your hamstring';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Here\'s your stretch', speechText)
      .getResponse();
  },
};
//=================================================================================
const AnkleIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AnkleIntent';
  },
  handle(handlerInput) {
    const speechText = 'Here\'s a stretch for your ankle';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Here\'s your stretch', speechText)
      .getResponse();
  },
};
//=================================================================================
const KneeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'KneeIntent';
  },
  handle(handlerInput) {
    const speechText = 'Here\'s how to help your knee';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Here\'s how to help your knee', speechText)
      .getResponse();
  },
};
//=================================================================================
const BodypartIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BodypartIntent';
  },
  handle(handlerInput) {
    const speechText = 'Here\'s how you can exercise your {bodypart}';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Here\'s your stretch', speechText)
      .getResponse();
  },
};
//=================================================================================
// help intent handler
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';  // contains built-in help intent functions
  },
  handle(handlerInput) {
    const speechText = 'You can ask for help with a specific exercise or stretch';  // advises user

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Ask for help with a stretch!', speechText)
      .getResponse();
  },
};
//=================================================================================
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'See ya!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Bye!', speechText)
      .getResponse();
  },
};
//=================================================================================
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};
//=================================================================================
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HamstringIntentHandler,
    KneeIntentHandler,
    AnkleIntentHandler,
    BodypartIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();