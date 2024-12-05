import React from 'react';

function YourComponent() {
  return (
    <div>
      {/* Other content goes here */}
      
      {/* YouTube video embed */}
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          className="embed-responsive-item" 
          src="https://www.youtube.com/embed/IJCEpbIHTa8"
          title="YouTube Video"
          allowFullScreen
        ></iframe>
      </div>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          className="embed-responsive-item"
          src="https://www.youtube.com/embed/BENmAwUev0Q"
          title="YouTube Video"
          allowFullScreen
        ></iframe>
      </div>

      {/* More content goes here */}
    </div>
  );
}

export default YourComponent;
