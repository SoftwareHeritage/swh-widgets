export default function ErrorMsg(error) {
  if(!error) {
    error = {
      "message": "The request Object is not available"
    };
  }
  return <div>Error loading the object</div>;
}
