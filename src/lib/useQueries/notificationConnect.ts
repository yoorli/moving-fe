function NotificationConnect() {
  const EventSourcePolyfill =
    (window as any).EventSourcePolyfill || EventSource;

  // EventSource 연결 함수
  const connect = () => {
    const eventSource = new EventSourcePolyfill(
      'https://3.36.98.92.nip.io/notification/stream',
      {
        withCredentials: true,
      },
    );

    // 오류 발생 시
    eventSource.onerror = (error: any) => {
      console.error('SSE connection error:', error);
      eventSource.close();
      setTimeout(() => {
        connect(); // 재연결 시도
      }, 5000); // 5초 후 재연결 시도
    };
  };

  // 처음 연결 시도
  connect();
}

export default NotificationConnect;
