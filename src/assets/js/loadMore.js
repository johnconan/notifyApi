export default function loadMore(data, countMessages) {
  const messages = [];
  if (data.length > countMessages) {
    for (let i = 0; i < countMessages; i++) {
      data[i].main = true;
      messages.push(data[i]);
    }
    return messages;
  } else {
    for (let i = 0; i < data.length; i++) {
      data[i].main = true;
      messages.push(data[i]);
    }
    return messages;
  }
}