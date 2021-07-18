import React, { useState } from "react";

import axiosWithAuth from '../helpers/axiosWithAuth';
import Color from './Color';
import EditMenu from './EditMenu';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(colors.map(color => {
          if(color.id === res.data.id){
            return res.data
          } else {
            return color
          }
        }))
        setEditing(false)
      })
      .catch(err => console.log(err))
  };

  // Upon saving the edited color, the client will submit a put request with the updated information. We will then update the colors by mapping through each color and changing the one with the matching id. I'm not sure if I needed to setEditing back to false, but I figured it wouldn't hurt anything, so here we are.

  const deleteColor = color => {
    axiosWithAuth().delete(`/${color.id}`)
      .then(res => updateColors(colors.filter(color => color.id !== Number(res.data))))
      .catch(err => console.log(err))
  };

  // Upon deleting, the client will send a delete request based on the id of the color they wish to delete. We then filter through the colors to return all of the colors that don't have that id.

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} editing={editing} color={color} editColor={editColor} deleteColor={deleteColor}/>)}
      </ul>
      
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};
export default ColorList;