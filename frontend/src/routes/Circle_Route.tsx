import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Avatar from "../components/Avatar";
import Post from "../components/Post";
import AuthModal from "../components/AuthModal";
import type { CircleDetails, PostMediaProps, PostType, Tier } from "../types";

export default function CirclePage() {
  const { circleId, circleSlug } = useParams();
  const [circleName, setCircleName] = useState<string>("");
  const [circleAvatar, setCircleAvatar] = useState<string | null>(null);
  const [circleBio, setCircleBio] = useState<string>("");
  const [circleMembers, setCircleMembers] = useState<string>("");
  const [circlePosts, setCirclePosts] = useState<PostType[]>([]);
  const [userCircleId, setUserCircleId] = useState<number | null>(null);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [userTier, setUserTier] = useState<Tier | null>(null);
  const { userId } = useUser();

  useEffect(() => {
    fetch(`/api/circles/${circleId}`)
      .then((response) => response.json())
      .then((result: CircleDetails[]) => {
        setCircleName(result[0].circle_name);
        setCircleAvatar(result[0].circle_avatar);
        setCircleBio(result[0].circle_bio);
        setCircleMembers(result[0].circle_members);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/circles/${circleId}/fans`)
      .then((response) => response.json())
      .then(
        (
          result: {
            uc_id: number;
            uc_circle_tier: Tier;
            uc_user_id: string;
          }[]
        ) => {
          const circleMember = result.find(({ uc_user_id }) => {
            return uc_user_id === userId;
          });
          if (circleMember) {
            setIsMember(true);
            setUserTier(circleMember.uc_circle_tier);
            setUserCircleId(circleMember.uc_id);
          }
        }
      );
  }, [circleId, userId]);

  useEffect(() => {
    fetch(`/api/posts/all/${circleId}`)
      .then((response) => response.json())
      .then((result: PostType[]) => {
        console.log(result);
        setCirclePosts(result);
      });
  }, [circleId]);

  const handleMembership = (chosenTier: Tier, ucId: number): void => {
    setIsMember(true);
    setUserTier(chosenTier);
    setUserCircleId(ucId);
  };

  const cancelMembership = (): void => {
    setIsMember(false);
    setUserTier(null);
    setUserCircleId(null);
  };

  const shouldBlur = (postTier: Tier, userTier: Tier | null): boolean => {
    if (!userTier) return true;
    const tierHierarchy = { Bronze: 1, Silver: 2, Gold: 3 };
    return tierHierarchy[userTier] < tierHierarchy[postTier];
  };

  return (
    <article className="wrapper-dark py-2">
      <section className="px-6 py-8 font-kanit flex flex-col items-center">
        <Avatar
          src={circleAvatar}
          variant="large"
          name={circleName}
          tierColor={userTier ? userTier : null}
        />
        <h1 className="text-3xl text-center text-(--orange-main) py-6">
          {circleName}
        </h1>
        <p className="text-sm text-(--purple-white)">
          In the circle: {circleMembers} members
        </p>
        <p className="text-base text-(--orange-white) py-6">{circleBio}</p>
        {!isMember ? (
          <div className="flex flex-col items-center bg-(--purple-white) py-8 px-6 rounded-lg shadow-md">
            <h2 className="text-lg text-(--purple-dark) pb-6">
              Become a part of {circleName} circle to access the exclusive
              content
            </h2>
            <AuthModal
              circleName={circleName}
              circleId={Number(circleId)}
              modalType="join"
              handleJoin={handleMembership}
              userId={userId}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center bg-(--purple-white) py-8 px-6 rounded-lg shadow-md">
            <h2 className="text-lg text-(--purple-dark)">
              You are a member of {circleName} circle
            </h2>
            <h3 className="text-xl font-bold text-(--orange-darker) pb-3">
              {userTier} tier
            </h3>
            <AuthModal
              circleName={circleName}
              modalType="manage"
              handleCancel={cancelMembership}
              ucId={userCircleId}
              userId={userId}
              userTier={userTier}
            />
          </div>
        )}
      </section>
      <section className="wrapper-light py-6">
        <h2 className="font-semibold text-2xl text-left text-(--purple-darker) py-4 px-4">
          What's {circleName} up to?
        </h2>
        {circlePosts &&
          circlePosts.map((p) => {
            const mediaProps: PostMediaProps = {};
            if (p.post_content) {
              if (p.post_content.includes("image")) {
                mediaProps.postImg = p.post_content;
              } else {
                mediaProps.video = p.post_content;
              }
            }

            const blurred: boolean = shouldBlur(p.post_tier, userTier);

            return (
              <section
                key={p.post_id}
                className="flex flex-col justify-center items-center px-4"
              >
                <Post
                  title={p.post_title}
                  text={p.post_text}
                  tier={p.post_tier}
                  imgsrc={circleAvatar}
                  blurred={blurred}
                  {...mediaProps}
                  slug={circleSlug}
                  circleId={Number(circleId)}
                />
                {!isMember && (
                  <AuthModal
                    circleName={circleName}
                    circleId={Number(circleId)}
                    modalType="join"
                    handleJoin={handleMembership}
                    userId={userId}
                    buttonText="Unlock content by joining this circle"
                  />
                )}
              </section>
            );
          })}
      </section>
    </article>
  );
}
