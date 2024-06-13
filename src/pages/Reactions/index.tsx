import React from "react";
import { observer } from "mobx-react";

import logo from "../../logo.svg";

import "./index.css";

import { ReactionStore } from "../../mobx/ReactionStore";
import { useMousePosition } from "../../hooks/useMousePosition";

const Reactions: React.FC<{ reactionStore: ReactionStore }> = observer(
  ({ reactionStore }) => {
    const mousePosition = useMousePosition();
    const [comment, setComment] = React.useState("");

    const resetView = (current?: number) => {
      document
        .querySelectorAll(
          ".reaction-content" +
            (current !== undefined ? `:not(#reaction-${current})` : "")
        )
        .forEach((reaction) => {
          reaction.classList.add("hidden");
        });
      setComment("");
    };

    return (
      <div
        className="App"
        onClick={() => {
          resetView();
          reactionStore.startDraft(mousePosition);
        }}
      >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            {reactionStore.draft && (
              <div
                className="draft"
                style={{
                  position: "absolute",
                  left:
                    reactionStore.reactionDraft.coordinates.x + 500 >
                    window.innerWidth
                      ? window.innerWidth - 500
                      : reactionStore.reactionDraft.coordinates.x,
                  top:
                    reactionStore.reactionDraft.coordinates.y + 500 >
                    window.innerHeight
                      ? window.innerHeight - 500
                      : reactionStore.reactionDraft.coordinates.y,
                }}
              >
                <input
                  type="text"
                  value={reactionStore.reactionDraft.text}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    e.stopPropagation();
                    reactionStore.setReactionDraftText(e.target.value);
                  }}
                />
                <button
                  disabled={!reactionStore.reactionDraft.text}
                  onClick={(e) => {
                    e.stopPropagation();
                    resetView();
                    reactionStore.addReaction();
                  }}
                >
                  React
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    reactionStore.cancelDraft();
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
            {reactionStore.reactions.map((reaction, index) => (
              <div
                className="reaction"
                key={index}
                style={{
                  position: "absolute",
                  left: reaction.coordinates.x,
                  top: reaction.coordinates.y,
                }}
              >
                <div
                  className="reaction-bubble"
                  onClick={(e) => {
                    e.stopPropagation();
                    resetView(index);
                    document
                      .querySelector(`#reaction-${index}`)
                      ?.classList.toggle("hidden");
                  }}
                >
                  &nbsp;
                </div>
                <div
                  id={`reaction-${index}`}
                  className="hidden reaction-content"
                >
                  <h4>{reaction.text}</h4>
                  {reaction.comments.length > 0 && (
                    <ul className="comments">
                      {reaction.comments.map((comment, index) => (
                        <li key={index}>
                          <h6>{comment}</h6>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="comment">
                    <input
                      type="text"
                      value={comment}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.stopPropagation();
                        setComment(e.target.value);
                      }}
                    />
                    <button
                      disabled={!comment}
                      onClick={(e) => {
                        e.stopPropagation();
                        reactionStore.addComment(index, comment);
                        setComment("");
                      }}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </header>
      </div>
    );
  }
);

export default Reactions;
