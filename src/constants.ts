export class Constants {
  public static DATABASE_NAME = 'SchoolSurveillance';
  public static projectId = 'bidkarlo-62ad9';
  public static PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCcrjpJxwglgHG9\nSm+iU6i9Cfxp4sV9htnVxur0XoEbF+dV/A10M2Vcffh63C1vTbH/sluBqiXQdjiV\nidymzTY4gmOOnmD00fi4+ic2WmIQyyB2CM7Y3rsD9xEhwYAOHdx6JXQ6b4xOeX/p\n792+yh5f3I75xL53EiFMgiGd4i8TjwsIImTJNnvXMLJ7N5Z19wgmi8729KweG6st\nXHPbSP9vzcmvt0qUTvVkXq2y26WIql773C9C0YTXhL2P+m8NcPWYTjgOiKtdD+qz\ng/av7Mu32TIa/+BVFqxrqi6B9Z+O8mA37rLssktlsT9fWrj+//GTqc7F9e6zqPbp\nltdAKMZHAgMBAAECggEAAjbyPDPip9y89Px/yWBUgF88aqH3XzLj4UcajXkrHBVG\nX/BDi/VGyhSM+u4OLPeyIzUmTR/HrW/rRfybX0Cq7gg+ZovJPvovHvGcZjQWUBMl\nt4Gz+xbZVN+/Q0idZ5DBBu+UXLpSETEgiU+gsVfhB/SKQoPsEIOk5dlfps7s6pN9\nVCIbscEzL9gxIP36WqM49Y2jz7p9/+yefcBkS4HkoShHrIsyg7jTufZtAGHJWGB5\nNxw3E2MR4tPkC3Kot6JZ6/Xbohi+AF7mqN5svrUVCrojusoP5xrUZNHuBOnZXumX\n5QaD7CU3qR33M2OV7dKztigDOrjNDM5AfKvTCGIjKQKBgQDN0sv6g3lZRW0qxpDn\nWQWjYMXFEuX5nTbMMr7i31Ildg0fNPCgbAXyT+/t5jk3+SUci7akOuSXa5IcPOxD\nQVMa1Np9Ua/5nnHz0+0nqGc+TXnP20yAwnaxhndpdPGvx+vLEyvhn8/CWZT5Veb5\nCtJKQoCurx6niK8+be78XgxU3wKBgQDC4Ht2X88ir0WFD7OhU8HFJ5uMnyaMrTdS\niqOiH/SPblMowjI0Ij0RknjV4DU8rNUUS60r0eETNErHr8efhP1QdSJx2IQwD4J1\nbB+7cjMmr4G6O/lrLRBsw+HwHBz0BUIH53pJ9YdhneqXOsxGrj7lGaWnmPwjgon4\no8o0bbKTmQKBgDO00SmN/d4/Yr1sRNrZsmDo3sYziTK8HBgQZ4P3NlvS3FkKo6ip\nepT1IAFT5Ov62yfgsXFwmhywGXSemXwL3STQdFMnQl4jP91RUDK2S7mLHR7qqL1w\nHQFcFoOXrV/LiaDqoAt+amMYviQlQHEwFsQxEMLRm5Ha9KtqUq9zsQVhAoGAYZ2I\nupbrbvhU3n4rAJiv604XwKzH5petqo7/wGo5Ws9soHIGK88qv+6a0Kdqg2Yfpfby\nW4zaLYB4JOaMG//F09OY2WYXcOuT8bWjf4WI0cwAM4VvPpxoKdNFDb1HU4R+uu7c\ndseidOdhZzdws8b8gk4CiJ09T5xH+GAzHWgFl6ECgYEAofinoAUSG2V5/T3QFn+b\nDAons5Z1rsgKlQPKa2aCOF8nFiB2ZmkMAfeLQXRrQeTwiZxlrBEc4EqhyRezGts8\nndGVyNiYQcx/4mowZNHxXV77pkGS6XJQgoEZl1JXPnPnnawQKsKmw82aRx1R0H9h\nwnLa4hQ8VP0PUkRqhCBqjbI=\n-----END PRIVATE KEY-----\n";
  public static STORAGE_BUCKET = 'gs://bidkarlo-62ad9.appspot.com';
  public static DATABASE_URL = 'https://bidkarlo-62ad9-default-rtdb.firebaseio.com/';
  public static CLIENT_EMAIL =
    "firebase-adminsdk-5slr1@bidkarlo-62ad9.iam.gserviceaccount.com";
  public static BCRYPT_HASH_ROUNDS = 10;
  public static JWT_CONSTANT_CONFIG = {
    secret: '$ecret2021',
    expiresIn: '86400',
  };   
} 
 
export enum CollectionNames {
  Users = "users",
  Tenants = "tenants",
  CloudFlareLogs = "cloudflarelogs",
  Agents = "Agents",
  System = "system",
  Invites = "invites"
}
