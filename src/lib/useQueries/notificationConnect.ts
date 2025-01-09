function NotificationConnect() {
  const EventSourcePolyfill =
    (window as any).EventSourcePolyfill || EventSource;

  const connect = () => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const eventSource = new EventSourcePolyfill(
      baseUrl + '/notification/stream',
      {
        withCredentials: true,
      },
    );

    // 오류 발생 시
    eventSource.onerror = (error: any) => {
      console.error('SSE connection error:', error);
      eventSource.close();
      setTimeout(() => {
        connect();
      }, 5000);
    };
  };

  connect();
}

export default NotificationConnect;
