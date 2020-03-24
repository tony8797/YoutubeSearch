import styled from 'styled-components';
import { palette } from 'styled-theme';
  
const YoutubeSearchListStyleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap:wrap;

  .singleVideoResult {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    width: calc(100% / 4 - 10px);
    cursor: pointer;

    @media only screen and (min-width: 768px) and (max-width: 1199px) {
      width: calc(100% / 3 - 10px);
    }
    @media only screen and (max-width: 767px) {
      width: calc(100% / 2 - 10px);
    }

    &:last-of-type {
      border-bottom: 0;
    }

    .videoThumb {
      width: 100%;
      max-height: 360px;
      min-height: 90px;
      display: -webkit-inline-flex;
      display: -ms-inline-flex;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
      padding:5px;
      position: relative;

      @media only screen and (max-width: 420px) {
        width: 200px;
        height: 200px;
      }

      .favoriteIcon {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 99;
        font-size: 24px;
      }

      .videoTime {
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 99;
        font-size: 12px;
        color: white;
        background-color: #5a5959;
        padding: 0 2px;
        border-radius: 2px;
      }
      
      figcaption {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 4px;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        margin: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.8);
        opacity: 0;
        visibility: hidden;
        transition: all 0.1s ease;
        text-align: center;

        ul {
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          li {
            display: inline-flex;
            align-items: center;
            margin: 0 20px;
            color: #ffffff;
            font-size: 16px;
            font-weight: 400;
            svg {
              width: auto;
              height: 18px;
              margin-left: 10px;
            }
            &:first-child {
              margin-left: 0;
            }
            &:last-child {
              margin-right: 0;
            }
          }
        };
        #videoHoverDescription {
            color: white;
            flex-direction: column;
            div {
                flex: 1;
                margin: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
            }
            .desc {
              overflow:hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              white-space: normal;
              word-break: break-all;
            }
        }
      }

      &:hover {
        figcaption {
          opacity: 1;
          visibility: visible;
        }
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .videoDescription {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0 0 0 5px;
        cursor: pointer;

        h3.videoName {
            width: 90%;
            flex-shrink: 0;
            margin: 0;

            @media only screen and (max-width: 767px) {
                width: 100%;
            }

            @media only screen and (min-width: 768px) and (max-width: 1199px) {
                flex-shrink: 1;
            }

            a {
                font-size: 14px;
                font-weight: 400;
                color: ${palette('text', 0)};
                line-height: 1;
                word-break: break-word;
                overflow: hidden;
                width: calc(100% - 10px);
                white-space: nowrap;
                text-overflow: ellipsis;
                display: inline-block;
                text-decoration: none;

                &:hover {
                    color: ${palette('primary', 0)};
                }
            }
        }

        p {
            font-size: 14px;
            font-weight: 400;
            color: ${palette('text', 3)};
            line-height: 1.3;
            margin-bottom: 0;
            margin-top: 10px;
            display: block;
            word-break: break-word;
        }
    }
  }
`;
const YoutubeSearchStyleWrapper = styled.div`
  margin-top: 30px;
  
  .totalResultFind {
    font-size: 18px;
    font-weight: 700;
    color: ${palette('text', 0)};
    line-height: 1.3;
    padding-bottom: 15px;
    border-bottom: 1px solid ${palette('border', 2)};
  }

  .linkBtn {
    color: white;
    float: right;
  }

  .youtubeSearchPagination {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 25px 0 10px;

    button {
      margin: 0 10px;
    }
  }
`;

const YoutubeModal = ComponentName => styled(ComponentName)`
  .ant-modal-close-x {
    width: 35px;
    height: 35px;
    line-height: 35px;
    background-color: #fff;
    border-radius: 0 0 0 5px;
  }

  .ant-modal-body {
    padding: 15px;
    iframe {
      width: 100%;
    }
  }
`;

export {
  YoutubeSearchListStyleWrapper,
  YoutubeSearchStyleWrapper,
  YoutubeModal,
};