#! /bin/sh

echo '服务器地址'
echo $serviceUrl

sysOS=`uname -s`
if [ $sysOS == "Darwin" ];then
  sed -i '' "s|VUE_APP_API=.*|VUE_APP_API=${serviceUrl}|" .env;
  sed -i '' "s|VUE_APP_zhiyunshanUrl=.*|VUE_APP_zhiyunshanUrl=${zhiyunshanUrl}|" .env;
  echo '设置完成'
else
  sed -i "s|VUE_APP_API=.*|VUE_APP_API=${serviceUrl}|" .env;
  sed -i "s|VUE_APP_zhiyunshanUrl=.*|VUE_APP_zhiyunshanUrl=${zhiyunshanUrl}|" .env;
  echo '设置完成'
fi
