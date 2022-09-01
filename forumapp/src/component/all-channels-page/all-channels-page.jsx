import React from "react";
import "./all-channels-page.scss";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setupAllChannels } from "../../features/tmsm/tmsmSlice";
import { sortObjectByCreateAt } from "../../utils/sort";
import ChannelTag from "../channel-tag/channel-tag";

const AllChannelsPage = () => {
  const dispatch = useDispatch();
  const { allChannels } = useSelector((store) => store.tmsm);
  const ac = sortObjectByCreateAt(allChannels);
  const count = ac.length;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "channels", "rooms"), (doc) => {
      const docData = doc.data();

      dispatch(setupAllChannels(docData));
    });

    return unsub;
  }, [dispatch]);
  return (
    <div className="all-channels-page-container">
      <div className="header">
        <h2>{count} channels in total</h2>
      </div>
      <div className="body">
        {ac.map((c) => {
          return <ChannelTag channel={c} key={c.roomId} />;
        })}
      </div>
    </div>
  );
};

export default AllChannelsPage;
