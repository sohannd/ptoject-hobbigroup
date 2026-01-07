
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img src={post.userAvatar} alt={post.userName} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h4 className="font-bold text-slate-800 leading-tight">{post.userName}</h4>
              <p className="text-xs text-slate-500">{post.timestamp.toLocaleDateString()}</p>
            </div>
          </div>
          {post.isProgressUpdate && (
            <span className="bg-green-100 text-green-700 text-[10px] uppercase font-bold px-2 py-1 rounded-full border border-green-200">
              Progress Update
            </span>
          )}
        </div>

        <p className="text-slate-700 mb-4 whitespace-pre-wrap">{post.content}</p>
        
        {post.image && (
          <div className="rounded-xl overflow-hidden mb-4">
            <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[500px]" />
          </div>
        )}

        {post.skillTag && (
          <div className="flex items-center gap-1 mb-4">
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
              🎯 {post.skillTag}
            </span>
          </div>
        )}

        <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
          <button className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors">
            <span>❤️</span>
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-slate-500 hover:text-yellow-600 transition-colors">
            <span>💬</span>
            <span className="text-sm font-medium">{post.comments.length}</span>
          </button>
          <button className="ml-auto text-slate-400 hover:text-slate-600">
            📤
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
