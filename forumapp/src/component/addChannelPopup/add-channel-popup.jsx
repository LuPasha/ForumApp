import "./add-channel-popup.scss";
import { useDispatch } from "react-redux";
import { closeAddChannelPopupOpen } from "../../features/channel/channelSlice";
import { CancelIcon } from "../../assets/icons/icons";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { addNewRoomToDatabase } from "../../utils/firebase";
import { useSelector } from "react-redux";
import { addNewRoomToUserChannel } from "../../utils/firebase";

const AddChannelPopup = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((store) => store.user);
  const [roomName, setRoomName] = useState("");

  const changeHandler = (e) => {
    e.preventDefault();
    setRoomName(e.target.value);
  };
  const checkEmpty = () => {
    return roomName === "";
  };
  const isEmpty = checkEmpty();

  const createNewRoom = () => {
    const roomId = uuid().slice(0, 23);

    const newRoom = {
      [roomId]: {
        roomName: roomName,
        roomId: roomId,
        roomMessages: [
          //messageid:message

          {
            userid: "111",
            message: "bashio",
            date: "2020-19-29",
            messageId: "1",
          },
          {
            userid: "111",
            message: "2222",
            date: "2020-19-29",
            messageId: "1",
          },
          {
            userid: "111",
            message: "2222",
            date: "2020-19-29",
            messageId: "1",
          },
          {
            userid: "111",
            message: "2222",
            date: "2020-19-29",
            messageId: "1",
          },
        ],
      },
    };

    addNewRoomToDatabase(newRoom, roomId);
    addNewRoomToUserChannel(newRoom, currentUser?.uid);
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
          <h4>Channel Name</h4>
          <div className="the-input">
            <label className="prefix">#</label>
            <input
              onChange={changeHandler}
              value={roomName}
              placeholder="e.g. hello"
            ></input>
          </div>
        </div>
        <div className="button-container">
          <button
            className="create-button"
            style={{
              backgroundColor: isEmpty ? "#c9c9c9" : "#444444",
              color: isEmpty ? "black" : "white",
            }}
            disabled={isEmpty}
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
