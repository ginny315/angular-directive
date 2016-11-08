angular.module('chat', ['app.common', 'pasvaz.bindonce', 'commonController'])
    .directive('fileModel', ['$parse', 'httpData', function ($parse, httpData) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                scope.getFile = function () {
                    fileReader.readAsDataUrl(scope.file, scope)
                        .then(function (result) {
                            scope.imageSrc = result;
                        });
                    scope.chat.isChooseImg = true;
                };

                element.bind('change', function (event) {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                    //附件预览
                    scope.file = (event.srcElement || event.target).files[0];
                    var size = scope.file.size / 1024 / 1024 / 2
                    if (size > 1) {
                        alert("图片大小不能超过2M！");
                    }else{
                        scope.getFile();
                       
                        scope.chat.loadingList.push(newImg);
                        /**
                         * 实现上传功能
                         * 上传成功返回了imghost,现在不返回给后端
                         */
                        httpData.uploadImg({
                            file: scope.file,
                            file_sign: num
                        }).then(function (response) {
                            console.log('upload file success');
                            var imgUrl = response.file_path;
                            var successNum = +response.file_sign;
                            httpData.submitChat({
                                'data':data
                            }).then(function (response) {

                            });
                        })
                    }
                });
            }
        };
    }])
    .directive("scroll", function () {
        return function(scope, element) {
            scope.$on('scrollTop',function(){
                if(element.context && element.context.scrollHeight){
                    var height = element.context.scrollHeight ;
                    element.scrollTop(height);
                }
            });
        };
    })