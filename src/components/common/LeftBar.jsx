import styled from "styled-components-2rem";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LeftBar() {
  const navigate = useNavigate();
  const [activeTitle, setActiveTitle] = useState(0);

  return (
    <LeftBarBox>
      <article className="navArea">
        <button onClick={() => navigate("/")}>
          <strong>Fixed Plan</strong>
        </button>

        <button onClick={() => navigate("/variableRapt")}>
          <strong>Variable Plan</strong>
        </button>

        <button onClick={()=>navigate("/exchanger")}>
          <strong>Exchanger</strong>
        </button>

      </article>
    </LeftBarBox>
  );
}
const LeftBarBox = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 26px;
  width: 260px;
  top: 100px;
  bottom: 0;
  left: 0;
  // position: fixed;
  z-index: 2;
  // padding: 66px 20px 26px 32px;
  padding: 2% 2%;
  // #5A6770
  .navArea {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    button {
      font-size: 16px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -0.32px;
      text-align: center;
      color: rgba(0, 0, 0, 0.1);
      font-family: Poppins;
      cursor: pointer;
      color: #5a6770;

      //   & :nth-child(${(props) => props.activeTitle}) {
      //     color: #ffffff;
      //   }
    }

    button:hover {
      color: #ffffff;
    }

    .navBtn,
    summary {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 18px;
      line-height: 18px;
      text-align: start;
      color: #a9abb0;

      &.navBtn {
        &.on {
          .icon {
            &.on {
              display: block;
            }

            &.off {
              display: none;
            }
          }
        }
      }

      &.on {
        color: #fff;
      }

      .icon {
        width: 18px;
        height: 16px;
        object-fit: contain;

        &.on {
          display: none;
        }
      }

      strong {
        flex: 1;
        width: 44px;
        height: 24px;
        font-family: Poppins;
        font-size: 16px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.32px;
        text-align: left;
        color: rgba(0, 0, 0, 0.1);
      }

      .arw {
        height: 18px;
        stroke: #a9abb0;
        transition: 0.14s;
      }
    }

    details {
      display: flex;
      flex-direction: column;
      gap: 18px;

      &[open] {
        summary {
          color: #fff;

          .icon {
            &.on {
              display: block;
            }

            &.off {
              display: none;
            }
          }

          .arw {
            stroke: #5376ff;
            transform: rotate(90deg);
          }
        }

        .detList {
          li {
            .dot {
              background: #5376ff;
            }
          }
        }
      }

      .detList {
        display: flex;
        flex-direction: column;
        gap: 18px;
        padding: 18px 30px 0 30px;

        li {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 16px;
          color: #a9abb0;
          cursor: pointer;

          &.on {
            color: #fff;
          }

          .dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #a9abb0;
          }
        }
      }
    }
  }
`;
