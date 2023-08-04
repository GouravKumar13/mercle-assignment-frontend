import React from "react";
import EngagementMessagesOverTime from "./utils/engagementMessages.js";
import { messageCountList } from "./utils/messageCounterList";
import { channels } from "./utils/channels";

function App () {
  return (
    <div >
      <EngagementMessagesOverTime

        messageCountList={ messageCountList }
        channels={ channels }
      />
    </div>
  );
}

export default App;
