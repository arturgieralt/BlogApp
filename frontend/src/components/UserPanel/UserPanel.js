import React from "react";
import JwtDecode from "jwt-decode";
import * as R from "ramda";
import PropTypes from "prop-types";
import Button from "../formElements/Button";
import StyledCard from "../Card/Card";
import ElementLabel from "../formElements/ControlLabel";
import updateFormElement from "../formElements/stateSetters";
import TextArea from "../formElements/TextArea";

export default class UserPanel extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      verifyToken: "",
      url: `https://localhost:3001/${user.info.avatarUrl}`,
      avatar: null
    };
  }

  handleAccountRemoval() {
    const shouldRemove = window.confirm("Are you sure to remove your account?");
    if (shouldRemove) {
      const { removeUser } = this.props;
      removeUser();
    }
  }

  handleChange(event) {
    event.persist();
    const { target } = event;
    this.setState(updateFormElement(target));
  }

  handleSubmit() {
    const { verifyToken } = this.state;
    const isFormValid = this.validate();

    if (isFormValid) {
      const { verifyUser } = this.props;
      verifyUser(verifyToken);
    }
  }

  validate() {
    const { verifyToken } = this.state;
    try {
      const decodedToken = JwtDecode(verifyToken);
      return !R.isNil(decodedToken);
    } catch (e) {
      return false;
    }
  }

  onAvatarUpload(e) {
    const avatar = R.path(["target", "files", "0"], e);
    if (avatar) {
      this.setState({
        url: URL.createObjectURL(avatar),
        avatar
      });
    }
  }

  onAvatarSend() {
    const { avatar } = this.state;
    const { uploadAvatar } = this.props;
    if (avatar) {
      const data = new FormData();
      data.append("file", avatar);
      uploadAvatar(data);
    }
  }

  onAvatarSend = this.onAvatarSend.bind(this);

  onAvatarUpload = this.onAvatarUpload.bind(this);

  handleChange = this.handleChange.bind(this);

  handleSubmit = this.handleSubmit.bind(this);

  handleAccountRemoval = this.handleAccountRemoval.bind(this);

  render() {
    const { verifyToken, url } = this.state;
    const {
      isActive,
      user: { info }
    } = this.props;

    return (
      <React.Fragment>
        <StyledCard margin="20px auto" title={`Welcome ${info.name}`}>
          You can manage your account here.
        </StyledCard>
        <StyledCard margin="20px auto" title="Remove account">
          <Button type="button" onClick={this.handleAccountRemoval}>
            Remove account
          </Button>
        </StyledCard>
        <StyledCard margin="20px auto" title="Add photo">
          <input
            type="file"
            name="avatar"
            onChange={this.onAvatarUpload}
            accept="image/*"
          />
          <img
            src={url || info.avatarUrl}
            alt="Your avatar"
            style={{ width: "200px" }}
          />
          <Button type="button" onClick={this.onAvatarSend}>
            Add photo
          </Button>
        </StyledCard>
        {!isActive && (
          <StyledCard width="500px" margin="20px auto" title="Verify account">
            <ElementLabel name="Paste your token here">
              <TextArea name="verifyToken" onChange={this.handleChange}>
                {verifyToken}
              </TextArea>
            </ElementLabel>
            <Button type="button" onClick={this.handleSubmit}>
              Register
            </Button>
          </StyledCard>
        )}
      </React.Fragment>
    );
  }
}

UserPanel.propTypes = {
  verifyUser: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};
