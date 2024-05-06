export default interface IStreamItem {
  stream_title: string;
  is_active: boolean;
  video_width: number;
  video_height: number;
  video_framerate: number;
  video_codec: string;
  time: number;
}
