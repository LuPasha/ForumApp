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
    const roomId = uuid().slice(0, 8);

    const newRoom = {
      [roomId]: {
        roomName: roomName,
        roomId: roomId,
        roomMessages: [
          //messageid:message

          {
            userid: "111",
            userName: "iiiiiiii",
            message: "bashio",
            date: "2022-19-29",
            messageId: "1",
            time: "9:12",
            replies: [
              {
                userid: "111",
                replyId: "1",
                date: "2222-12-21",
                time: "3:21",
                userName: "shoa",
                replyContent: "shiohaoihoihdo",
              },
              {
                userid: "111",
                replyId: "2",
                date: "2222-12-21",
                time: "3:21",
                userName: "shoa",
                replyContent: "shiohaoihoihdo",
              },
            ],
          },
          {
            userid: "211",
            userName: "shioahoid",
            message: "sssssssssssddd ddddd wwwww rrrrrrr",
            date: "2020-19-29",
            messageId: "2",
            time: "9:12",
            replies: [],
          },
          {
            userid: "311",
            userName: "Mk",
            message:
              "ewer ssssssssss ssssssssss sssss ss sssssssss s sssssssssssssssssss s s sssss sssss ssssssss ssss ss sssssss ss ss sss ",
            date: "2020-01-29",
            messageId: "3",
            time: "12:12",
            replies: [],
          },
          {
            userid: "511",
            userName: "Jack Jones",
            message:
              "Wikis are enabled by wiki software, otherwise known as wiki engines. A wiki engine, being a form of a content management system, differs from other web-based systems such as blog software, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users.[1] Wiki engines usually allow content to be written using a simplified markup language and sometimes edited with the help of a rich-text editor.[2] There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open-source, whereas others are proprietary. Some permit control over different functions (levels of access); for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control. Other rules may be imposed to organize content.",
            date: "2022-03-19",
            messageId: "4",
            time: "23:12",
            replies: [],
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
              autoFocus={true}
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
