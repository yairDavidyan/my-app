import * as React from "react";
import Drawer from "@mui/material/Drawer";
export default function TemporaryDrawer() {
  return (
    <div>
      <Drawer
        anchor={"left"}
        open={true}
        //   onClose={toggleDrawer(anchor, false)}
      >
        <div>dsdd</div>
      </Drawer>
    </div>
  );
}
