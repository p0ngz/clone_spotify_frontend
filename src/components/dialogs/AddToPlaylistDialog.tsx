import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { usePlaylistStore } from "../../store/usePlaylistStore";
import { playlistService } from "../../service/playlistService";
import { usePlaylistSongStore } from "../../store/usePlaylistSongStore";
import { env } from "../../config/env";

interface AddToPlaylistDialogProps {
  open: boolean;
  onClose: () => void;
  songId: string;
  songTitle: string;
}

const AddToPlaylistDialog = ({
  open,
  onClose,
  songId,
  songTitle,
}: AddToPlaylistDialogProps) => {
  const { playlists, getPlaylistByUserId } = usePlaylistStore();
  const { createPlaylistSong } = usePlaylistSongStore();

  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null,
  );
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
  const [newPlaylistIsPublic, setNewPlaylistIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load playlists when dialog opens
  useEffect(() => {
    if (open) {
      const userId = env?.VITE_USER_ID;
      if (userId) {
        getPlaylistByUserId(userId);
        setError(null);
      } else {
        setError("User ID not found. Please check environment configuration.");
      }
    }
  }, [open, getPlaylistByUserId]);

  const handleSelectPlaylist = (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
    setIsCreatingNew(false);
  };

  const handleCreateNew = async () => {
    if (!newPlaylistName.trim()) {
      setError("Playlist name is required");
      return;
    }

    const userId = env?.VITE_USER_ID;
    if (!userId) {
      setError("User ID not found. Please check environment configuration.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("name", newPlaylistName);
      formData.append("description", newPlaylistDescription);
      formData.append("is_public", String(newPlaylistIsPublic));

      // Add a tiny placeholder image
      const placeholderBlob = new Blob([new Uint8Array([0])], {
        type: "image/png",
      });
      formData.append("playlist_img", placeholderBlob, "placeholder.png");

      const newPlaylist = await playlistService.createPlaylist(formData as any);

      console.log("Created playlist: ", newPlaylist);
      if (newPlaylist.playlist._id) {
        await createPlaylistSong(newPlaylist.playlist._id, songId);
      }

      await getPlaylistByUserId(userId);

      setNewPlaylistName("");
      setNewPlaylistDescription("");
      setNewPlaylistIsPublic(false);
      setIsCreatingNew(false);
      setSelectedPlaylistId(null);
      onClose();
    } catch (err) {
      setError((err as Error).message || "Failed to create playlist");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlaylist = async () => {
    if (!selectedPlaylistId) {
      setError("Please select a playlist");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createPlaylistSong(selectedPlaylistId, songId);

      setSelectedPlaylistId(null);
      setIsCreatingNew(false);
      onClose();
    } catch (err) {
      setError((err as Error).message || "Failed to add song to playlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#282828",
          backgroundImage: "none",
          color: "#ffffff",
        },
      }}
    >
      <DialogTitle sx={{ color: "#ffffff" }}>
        Add "{songTitle}" to Playlist
      </DialogTitle>
      <DialogContent dividers sx={{ borderColor: "rgba(255,255,255,0.1)" }}>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {!isCreatingNew ? (
          <>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Select a playlist or create a new one
            </Typography>

            {playlists && playlists.length > 0 ? (
              <List
                sx={{
                  maxHeight: 300,
                  overflow: "auto",
                  mb: 2,
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 1,
                }}
              >
                {playlists.map((playlist) => (
                  <ListItem key={playlist._id} disablePadding>
                    <ListItemButton
                      selected={selectedPlaylistId === playlist._id}
                      onClick={() => handleSelectPlaylist(playlist._id)}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.1)",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "rgba(255,255,255,0.15)",
                          "&:hover": {
                            backgroundColor: "rgba(38, 212, 16, 0.5)",
                          },
                        },
                      }}
                    >
                      <ListItemText
                        primary={playlist.name}
                        secondary={playlist.description}
                        primaryTypographyProps={{
                          variant: "body2",
                          sx: { color: "#ffffff" },
                        }}
                        secondaryTypographyProps={{
                          noWrap: true,
                          variant: "caption",
                          sx: { color: "rgba(255,255,255,0.7)" },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography
                variant="body2"
                sx={{ mb: 2, color: "rgba(255,255,255,0.5)" }}
              >
                No playlists yet
              </Typography>
            )}

            <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

            <Button
              fullWidth
              variant="outlined"
              onClick={() => setIsCreatingNew(true)}
              sx={{
                mb: 2,
                color: "#ffffff",
                borderColor: "rgba(255,255,255,0.3)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.5)",
                  backgroundColor: "rgba(38, 212, 16, 0.5)",
                },
              }}
            >
              + Create New Playlist
            </Button>
          </>
        ) : (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Create New Playlist
            </Typography>

            <TextField
              fullWidth
              label="Playlist Name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              size="small"
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#ffffff" },
                "& .MuiOutlinedInput-root": {
                  color: "#ffffff",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": { borderColor: "#ffffff" },
                },
              }}
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Description"
              value={newPlaylistDescription}
              onChange={(e) => setNewPlaylistDescription(e.target.value)}
              size="small"
              multiline
              rows={3}
              sx={{
                mb: 2,
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#ffffff" },
                "& .MuiOutlinedInput-root": {
                  color: "#ffffff",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.5)" },
                  "&.Mui-focused fieldset": { borderColor: "#ffffff" },
                },
              }}
              disabled={loading}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={newPlaylistIsPublic}
                  onChange={(e) => setNewPlaylistIsPublic(e.target.checked)}
                  disabled={loading}
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&.Mui-checked": { color: "#ffffff" },
                  }}
                />
              }
              label="Make this playlist public"
              sx={{
                mb: 2,
                "& .MuiFormControlLabel-label": { color: "#ffffff" },
              }}
            />

            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setIsCreatingNew(false);
                setNewPlaylistName("");
                setNewPlaylistDescription("");
                setNewPlaylistIsPublic(false);
              }}
              disabled={loading}
              sx={{
                mb: 1,
                color: "#ffffff",
                borderColor: "rgba(255,255,255,0.3)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.5)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Back
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleCreateNew}
              disabled={loading || !newPlaylistName.trim()}
              sx={{
                backgroundColor: "#1db954",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#1ed760",
                },
                "&:disabled": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.5)",
                },
              }}
            >
              Create Playlist
            </Button>
          </Box>
        )}
      </DialogContent>

      {!isCreatingNew && (
        <DialogActions sx={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <Button
            onClick={onClose}
            sx={{
              color: "rgba(255,255,255,0.7)",
              "&:hover": {
                color: "#ffffff",
                backgroundColor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddToPlaylist}
            variant="contained"
            disabled={!selectedPlaylistId || loading}
            sx={{
              backgroundColor: "#1db954",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#1ed760",
              },
              "&:disabled": {
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.5)",
              },
            }}
          >
            Add to Playlist
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default AddToPlaylistDialog;
