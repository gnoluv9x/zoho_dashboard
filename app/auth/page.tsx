export default function Auth() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#0c0116]">
      <form className="login__form">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div className="form-inner">
          <h2>ZOHO SPRINTS</h2>
          <div className="content">
            <input className="input" type="text" placeholder="Username" />
            <input className="input" type="password" placeholder="Password" />
            <button className="btn">LOGIN</button>
          </div>
        </div>
      </form>
    </div>
  );
}
