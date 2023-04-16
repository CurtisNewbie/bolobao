// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  shouldMockResp: false,
  isThroughGateway: true,
  mockData: {
    authToken: "123123123123123",
    userInfo: {
      id: 1,
      username: "Test User",
      role: "admin",
      isDisabled: 0,
      reviewStatus: "APPROVED",
      createTime: "2022-01-01 12:00",
      updateTime: "",
      updateBy: "",
      createBy: "",
      registerDate: "2022-01-01 12:00",
    },
    userKeyList: {
      pagingVo: {
        page: 1,
        limit: 10,
        total: 100,
      },
      payload: [
        {
          id: 1,
          secretKey: "BC12392381LKDSF123",
          name: "work",
          expirationTime: "2022-07-07",
          createTime: "2022-06-07",
        },
        {
          id: 2,
          secretKey: "BC12392381LKDSF123",
          name: "home",
          expirationTime: "2022-07-07",
          createTime: "2022-06-07",
        },
      ],
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
