import Avatar from 'boring-avatars';

export default function UserAvatorIcon({ name }: { name: string }) {
  return (
    <Avatar
      size={40}
      name={name}
      variant="beam"
      colors={['#FFBD87', '#FFD791', '#F7E8A6', '#D9E8AE', '#BFE3C0']}
    />
  );
}
