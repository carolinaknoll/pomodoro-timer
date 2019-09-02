export default function padTime (minutes, seconds) {
  const mins = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secs = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${mins}:${secs}`;
}
