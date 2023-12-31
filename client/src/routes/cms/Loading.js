export const Loading= ({message}) => {
  return (
    <main className='not-login-cms'>
      <p>{message}</p>

      <div className="meme">
        <img src="https://i.kym-cdn.com/photos/images/original/001/082/426/6ff.gif"
          alt="Welcome gif" />
      </div>
    </main>
  );
}