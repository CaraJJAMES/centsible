import React from 'react';
import FriendsList from '../social/FriendsList';
import GroupsList from '../social/GroupsList';
import Leaderboard from '../social/Leaderboard';
import GroupChallenges from '../social/GroupChallenges';

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <FriendsList />
        <GroupsList />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Leaderboard />
        <GroupChallenges />
      </div>
    </div>
  );
}