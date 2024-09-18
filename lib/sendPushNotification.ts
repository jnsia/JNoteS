export async function sendPushNotification(to: string, title: string, body: string) {
  const message = {
    to,
    sound: 'default',
    title,
    body,
    data: {},
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}
