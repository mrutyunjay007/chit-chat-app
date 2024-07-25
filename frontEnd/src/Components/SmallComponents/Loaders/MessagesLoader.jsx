import React from "react";

function MessagesLoader() {
  return (
    <div className="w-full h-full">
      <MessagesLoader isByUser={true}></MessagesLoader>
    </div>
  );
}

export default MessagesLoader;
