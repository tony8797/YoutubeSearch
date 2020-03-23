import React from 'react';
import YouTube from 'react-youtube';
import { Modal } from 'antd';
import { YoutubeModal } from './YoutubeSearch.style';

const ModalWrapper = YoutubeModal(Modal);

export default function({ selectedVideo, handleCancel }) {
  const ops = { playerVars: { autoplay: 1 } };
  console.log(selectedVideo);
  return (
    <ModalWrapper
      title={selectedVideo.snippet.tittle}
      visible={true}
      footer={null}
      onCancel={handleCancel}
      cancelText="Cancel"
      className="youtubeVideoModal"
      width="670px"
    >
      <div />
      <YouTube videoId={selectedVideo.id.videoId} opts={ops} />
    </ModalWrapper>
  );
}
