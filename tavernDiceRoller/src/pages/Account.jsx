import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { user, updateUser, deleteAccount } = useAuth();
  const navigate = useNavigate();

  const [newEmail, setNewEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateMsg, setUpdateMsg] = useState(null); // { text, type }
  const [deleteError, setDeleteError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateMsg(null);

    if (newPassword && newPassword !== confirmPassword) {
      return setUpdateMsg({
        text: "New passwords do not match.",
        type: "danger",
      });
    }
    if (!newEmail && !newPassword && !newFirstName && !newLastName) {
      return setUpdateMsg({ text: "Nothing to update.", type: "warning" });
    }
    try {
      const fields = {};
      if (newEmail) fields.email = newEmail;
      if (newFirstName) fields.firstName = newFirstName;
      if (newLastName) fields.lastName = newLastName;
      if (newPassword) {
        fields.currentPassword = currentPassword;
        fields.newPassword = newPassword;
      }
      await updateUser(fields);
      setUpdateMsg({ text: "Account updated successfully.", type: "success" });
      setNewEmail("");
      setNewFirstName("");
      setNewLastName("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setUpdateMsg({ text: err.message, type: "danger" });
    }
  };

  const handleDelete = async () => {
    setDeleteError(null);
    try {
      await deleteAccount();
      navigate("/");
    } catch (err) {
      setDeleteError(err.message);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "480px" }}>
      <h2 className="mb-4" style={{ color: "#881c1c" }}>
        Account Settings
      </h2>
      <p className=" mb-4">
        Logged in as <strong>{user?.firstName}</strong>
      </p>

      {/* Update Form */}
      <div
        className="card mb-4"
        style={{ background: "#2a2a2a", border: "1px solid #881c1c" }}
      >
        <div className="card-body">
          <h5 className="card-title mb-3" style={{ color: "#fefefe" }}>
            Update Account
          </h5>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label text-light">New Email</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                placeholder={user?.email}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label text-light">New First Name</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                placeholder={user?.firstName}
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label text-light">New Last Name</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                placeholder={user?.lastName}
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
            </div>
            <hr style={{ borderColor: "#444" }} />
            <p className="text-muted small mb-2">
              Leave password fields blank to keep current password.
            </p>
            <div className="mb-3">
              <label className="form-label text-light">Current Password</label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-light">New Password</label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-light">
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-control bg-dark text-light border-secondary"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {updateMsg && (
              <div className={`alert alert-${updateMsg.type} py-2`}>
                {updateMsg.text}
              </div>
            )}
            <button
              type="submit"
              className="btn w-100"
              style={{ background: "#881c1c", color: "#fefefe" }}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {/* Delete Account */}
      <div
        className="card"
        style={{ background: "#2a2a2a", border: "1px solid #555" }}
      >
        <div className="card-body">
          <h5 className="card-title mb-1" style={{ color: "#fefefe" }}>
            Delete Account
          </h5>
          <p className="text-muted small mb-3">
            This is permanent and cannot be undone.
          </p>
          {deleteError && (
            <div className="alert alert-danger py-2">{deleteError}</div>
          )}
          {!showDeleteConfirm ? (
            <button
              className="btn btn-outline-danger w-100"
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete My Account
            </button>
          ) : (
            <div>
              <p className="text-warning small">
                Are you sure? This will permanently delete your account.
              </p>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-danger flex-fill"
                  onClick={handleDelete}
                >
                  Yes, Delete
                </button>
                <button
                  className="btn btn-secondary flex-fill"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
