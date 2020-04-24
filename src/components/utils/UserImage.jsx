import React from "react";

const UserImage = ({image,style}) => {
  return (
    <div className="avatar-upload" style={style}>
      <div className="avatar-preview">
        <div
          id="imagePreview"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
    </div>
  );
};

export default UserImage;
