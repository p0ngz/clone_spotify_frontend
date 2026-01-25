import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export interface MenuOption {
  id: string;
  label: string;
  onClick: () => void;
  divider?: boolean; // Add divider after this item
}

interface MenuProps {
  options: MenuOption[];
  triggerIcon?: React.ReactNode; //for trigger button icon
}

const MenuPopup = ({ options, triggerIcon }: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (callback: () => void) => {
    callback();
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="text-white/70 hover:text-white transition p-1"
        aria-label="More options"
      >
        {triggerIcon || <MoreVertIcon fontSize="small" />}
      </button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#282828",
              backgroundImage: "none",
              minWidth: "200px",
            },
          },
        }}
      >
        {options.map((option, index) => (
          <div key={option.id}>
            <MenuItem
              onClick={() => handleMenuItemClick(option.onClick)}
              sx={{
                color: "#ffffff",
                fontSize: "0.875rem",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <p className="text-white/50">{option.label}</p>
            </MenuItem>
            {option.divider && index < options.length - 1 && (
              <div className="h-px bg-white/10 my-1" />
            )}
          </div>
        ))}
      </Menu>
    </>
  );
};

export default MenuPopup;
