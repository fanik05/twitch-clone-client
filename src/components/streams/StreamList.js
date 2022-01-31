import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

const StreamList = ({ currentUserId, isSignedIn, streams, fetchStreams }) => {
  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  const renderadmin = stream => {
    if (stream.userId === currentUserId) {
      return (
        <div className="right floated content">
          <button className="ui button primary">Edit</button>
          <button className="ui button negative">Delete</button>
        </div>
      );
    }
  };

  const renderList = () => {
    return streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {renderadmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  };

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  };

  return (
    <>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </>
  );
};

const mapStateToProps = ({ auth: { userId, isSignedIn }, streams }) => {
  return { streams: Object.values(streams), currentUserId: userId, isSignedIn };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
