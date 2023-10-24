// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

module.exports = {
    async headers() {
      return [
        {
          source: '/api/task', // ここにAPIエンドポイントのパスを指定
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*', // ワイルドカード(*)を使用してすべてのオリジンからのリクエストを許可
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET, POST, PUT, PATCH, DELETE, OPTIONS', // 許可するHTTPメソッドを指定
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'X-Requested-With, Content-Type, Authorization', // 許可するヘッダーを指定
            },
          ],
        },
      ];
    },
  };
  