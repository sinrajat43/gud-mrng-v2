// async function getSentiment(text: string) {
//   const response = await openai.Completion.create({
//     engine: 'text-davinci-002',
//     prompt: `Sentiment analysis of the following text:\n${text}\n`,
//     temperature: 0.5,
//     max_tokens: 1,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//     stop: ['\n'],
//   });

async function main() {
  const paragraphs = document.getElementsByTagName('figcaption');

  // Replace the text of each paragraph with "Hello, world!"
  for (let i = 0; i < paragraphs.length; i++) {
    const text = paragraphs[i].textContent;
    // const sentiment = await getSentiment(text);
    // console.log(`The sentiment of the text is ${sentiment}`);
    if(i<5){
      sentiment = await fetchSentiment(text)
      console.log('Sentiment response is ',sentiment);
    }
    if(await fetchSentiment(text) =='Negative'){
      paragraphs[i].parentElement.parentElement.remove()
    }
  }
}

async function fetchSentiment(text){
  let resData
  const res = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
          },
          body: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": "Do a one word sentiment analysis in Positive, Negative or neutral of text: "+text,
            "temperature": 1,
            "max_tokens": 7
          })
        }).then(response => response.json())
        .then(data => resData=data)
        .catch(error => console.log('Error:', error));;
    sentiment=resData.choices[0].text.substring(2)
    return sentiment;
}

main();

setInterval(main, 10000);
