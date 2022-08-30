import "./add-channel-popup.scss";
import { useDispatch } from "react-redux";
import { closeAddChannelPopupOpen } from "../../features/channel/channelSlice";
import { CancelIcon } from "../../assets/icons/icons";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { useSelector } from "react-redux";
import {
  addNewRoomToDatabase,
  addNewRoomToUserChannel,
  addReservedWordToDatabase,
} from "../../utils/firebase";

const AddChannelPopup = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((store) => store.user);
  const { reservedWords } = useSelector((store) => store.reserved);
  const [roomName, setRoomName] = useState("");

  const isNameUsed = reservedWords.includes(roomName);

  const changeHandler = (e) => {
    e.preventDefault();
    setRoomName(e.target.value);
  };

  const isEmpty = roomName === "";
  const buttonDisable = isEmpty || isNameUsed;

  const createNewRoom = () => {
    const roomId = uuid().slice(0, 8);
    const today = new Date();
    const createAt = today.getTime();

    const newRoom = {
      [roomId]: {
        roomName: roomName,
        roomId: roomId,
        createAt: createAt,
      },
    };

    addNewRoomToDatabase(newRoom, roomId);
    addNewRoomToUserChannel(newRoom, currentUser?.uid);
    addReservedWordToDatabase(roomName);
    dispatch(closeAddChannelPopupOpen());
  };

  return (
    <div className="channel-popup-container">
      <div className="modal">
        <div>
          <div className="modal-header">
            <h2>Create a channel</h2>
            <div
              className="icon-container"
              onClick={() => {
                dispatch(closeAddChannelPopupOpen());
              }}
            >
              <CancelIcon />
            </div>
          </div>
          <div className="description">
            Channels are where your team communicates. They're best when
            organized around a topic. eg.#marketing.
          </div>
        </div>

        <div className="input-section">
          <div>
            <h4>Name</h4>
            {isNameUsed && (
              <div className="name-used">
                That name is already taken by a channel, username, or user
                group.
              </div>
            )}
          </div>
          <div className="the-input">
            <label className="prefix">#</label>
            <input
              onChange={changeHandler}
              value={roomName}
              placeholder="e.g. hello"
              autoFocus={true}
            ></input>
          </div>
        </div>
        <div className="button-container">
          <button
            className="create-button"
            style={{
              backgroundColor: buttonDisable ? "#c9c9c9" : "#444444",
              color: buttonDisable ? "black" : "white",
            }}
            disabled={buttonDisable}
            onClick={() => {
              createNewRoom();
            }}
          >
            Create
          </button>
          <button
            className="cancel-button"
            onClick={() => {
              dispatch(closeAddChannelPopupOpen());
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChannelPopup;
