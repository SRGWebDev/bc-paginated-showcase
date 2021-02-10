module.exports = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/showcase/1',
            permanent: true,
          },
        ]
      },
}