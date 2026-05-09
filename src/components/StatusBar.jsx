export default function StatusBar({ time = "9:41" }) {
  return (
    <div className="t-status">
      <span>{time}</span>
      <div className="right">
        <span className="signal"><i></i><i></i><i></i><i></i></span>
        <svg width="15" height="11" viewBox="0 0 15 11" style={{ marginLeft: 2 }}>
          <path d="M7.5 2.5C9.6 2.5 11.4 3.3 12.7 4.6L13.7 3.6C12 2 9.9 1 7.5 1C5.1 1 3 2 1.3 3.6L2.3 4.6C3.6 3.3 5.4 2.5 7.5 2.5Z" fill="#2D2C2A"/>
          <path d="M7.5 5.5C8.7 5.5 9.7 6 10.5 6.7L11.5 5.7C10.4 4.6 9 4 7.5 4C6 4 4.6 4.6 3.5 5.7L4.5 6.7C5.3 6 6.3 5.5 7.5 5.5Z" fill="#2D2C2A"/>
          <circle cx="7.5" cy="9" r="1.2" fill="#2D2C2A"/>
        </svg>
        <span className="battery"><i></i></span>
      </div>
    </div>
  );
}
