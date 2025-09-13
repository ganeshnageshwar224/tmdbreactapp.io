import React, { useState } from "react";
import { Button } from "@mui/material";
import AddNewTaskModal from "../AddNewTaskModal/AddNewTaskModal";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const handleSave = (task) => {
    console.log("Saved Task:", task);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        + Add New Task
      </Button>

      <AddNewTaskModal
        open={open}
        handleClose={() => setOpen(false)}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Dashboard;
