Type.registerNamespace('Hepsiburada.Services');
Hepsiburada.Services.ForumServices=function() {
Hepsiburada.Services.ForumServices.initializeBase(this);
this._timeout = 0;
this._userContext = null;
this._succeeded = null;
this._failed = null;
}
Hepsiburada.Services.ForumServices.prototype={
_get_path:function() {
 var p = this.get_path();
 if (p) return p;
 else return Hepsiburada.Services.ForumServices._staticInstance.get_path();},
CreateTopic:function(forumID,topicHeader,messageText,succeededCallback, failedCallback, userContext) {
/// <param name="forumID" type="Number">System.Int32</param>
/// <param name="topicHeader" type="String">System.String</param>
/// <param name="messageText" type="String">System.String</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
return this._invoke(this._get_path(), 'CreateTopic',false,{forumID:forumID,topicHeader:topicHeader,messageText:messageText},succeededCallback,failedCallback,userContext); },
CreateMessage:function(topicID,replyToMessageID,messageText,succeededCallback, failedCallback, userContext) {
/// <param name="topicID" type="Number">System.Int32</param>
/// <param name="replyToMessageID" type="Number">System.Int32</param>
/// <param name="messageText" type="String">System.String</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
return this._invoke(this._get_path(), 'CreateMessage',false,{topicID:topicID,replyToMessageID:replyToMessageID,messageText:messageText},succeededCallback,failedCallback,userContext); },
DeleteItem:function(itemID,mode,succeededCallback, failedCallback, userContext) {
/// <param name="itemID" type="Number">System.Int32</param>
/// <param name="mode" type="Hepsiburada.Forum.Controls.RemoveItem_RemoveItemMode">Hepsiburada.Forum.Controls.RemoveItem+RemoveItemMode</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
return this._invoke(this._get_path(), 'DeleteItem',false,{itemID:itemID,mode:mode},succeededCallback,failedCallback,userContext); },
Complain:function(mode,ItemID,resultBoxStyle,succeededCallback, failedCallback, userContext) {
/// <param name="mode" type="Hepsiburada.Forum.Controls.Complaint_ComplaintMode">Hepsiburada.Forum.Controls.Complaint+ComplaintMode</param>
/// <param name="ItemID" type="Number">System.Int32</param>
/// <param name="resultBoxStyle" type="String">System.String</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
return this._invoke(this._get_path(), 'Complain',false,{mode:mode,ItemID:ItemID,resultBoxStyle:resultBoxStyle},succeededCallback,failedCallback,userContext); },
RateMessage:function(messageID,ratingValue,succeededCallback, failedCallback, userContext) {
/// <param name="messageID" type="Number">System.Int32</param>
/// <param name="ratingValue" type="Number">System.Byte</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
return this._invoke(this._get_path(), 'RateMessage',false,{messageID:messageID,ratingValue:ratingValue},succeededCallback,failedCallback,userContext); },
GetForumTopics:function(forumID,pageNumber,controlWidth,succeededCallback, failedCallback, userContext) {
/// <param name="forumID" type="Number">System.Int32</param>
/// <param name="pageNumber" type="Number">System.Int32</param>
/// <param name="controlWidth" type="String">System.String</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
return this._invoke(this._get_path(), 'GetForumTopics',false,{forumID:forumID,pageNumber:pageNumber,controlWidth:controlWidth},succeededCallback,failedCallback,userContext); },
GetTopicMessages:function(topicID,pageNumber,controlWidth,highLightLastMessage,scrollToLastMessage,succeededCallback, failedCallback, userContext) {
/// <param name="topicID" type="Number">System.Int32</param>
/// <param name="pageNumber" type="Number">System.Int32</param>
/// <param name="controlWidth" type="String">System.String</param>
/// <param name="highLightLastMessage" type="Boolean">System.Boolean</param>
/// <param name="scrollToLastMessage" type="Boolean">System.Boolean</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
return this._invoke(this._get_path(), 'GetTopicMessages',false,{topicID:topicID,pageNumber:pageNumber,controlWidth:controlWidth,highLightLastMessage:highLightLastMessage,scrollToLastMessage:scrollToLastMessage},succeededCallback,failedCallback,userContext); }}
Hepsiburada.Services.ForumServices.registerClass('Hepsiburada.Services.ForumServices',Sys.Net.WebServiceProxy);
Hepsiburada.Services.ForumServices._staticInstance = new Hepsiburada.Services.ForumServices();
Hepsiburada.Services.ForumServices.set_path = function(value) {
Hepsiburada.Services.ForumServices._staticInstance.set_path(value); }
Hepsiburada.Services.ForumServices.get_path = function() { 
/// <value type="String" mayBeNull="true">The service url.</value>
return Hepsiburada.Services.ForumServices._staticInstance.get_path();}
Hepsiburada.Services.ForumServices.set_timeout = function(value) {
Hepsiburada.Services.ForumServices._staticInstance.set_timeout(value); }
Hepsiburada.Services.ForumServices.get_timeout = function() { 
/// <value type="Number">The service timeout.</value>
return Hepsiburada.Services.ForumServices._staticInstance.get_timeout(); }
Hepsiburada.Services.ForumServices.set_defaultUserContext = function(value) { 
Hepsiburada.Services.ForumServices._staticInstance.set_defaultUserContext(value); }
Hepsiburada.Services.ForumServices.get_defaultUserContext = function() { 
/// <value mayBeNull="true">The service default user context.</value>
return Hepsiburada.Services.ForumServices._staticInstance.get_defaultUserContext(); }
Hepsiburada.Services.ForumServices.set_defaultSucceededCallback = function(value) { 
 Hepsiburada.Services.ForumServices._staticInstance.set_defaultSucceededCallback(value); }
Hepsiburada.Services.ForumServices.get_defaultSucceededCallback = function() { 
/// <value type="Function" mayBeNull="true">The service default succeeded callback.</value>
return Hepsiburada.Services.ForumServices._staticInstance.get_defaultSucceededCallback(); }
Hepsiburada.Services.ForumServices.set_defaultFailedCallback = function(value) { 
Hepsiburada.Services.ForumServices._staticInstance.set_defaultFailedCallback(value); }
Hepsiburada.Services.ForumServices.get_defaultFailedCallback = function() { 
/// <value type="Function" mayBeNull="true">The service default failed callback.</value>
return Hepsiburada.Services.ForumServices._staticInstance.get_defaultFailedCallback(); }
Hepsiburada.Services.ForumServices.set_enableJsonp = function(value) { Hepsiburada.Services.ForumServices._staticInstance.set_enableJsonp(value); }
Hepsiburada.Services.ForumServices.get_enableJsonp = function() { 
/// <value type="Boolean">Specifies whether the service supports JSONP for cross domain calling.</value>
return Hepsiburada.Services.ForumServices._staticInstance.get_enableJsonp(); }
Hepsiburada.Services.ForumServices.set_jsonpCallbackParameter = function(value) { Hepsiburada.Services.ForumServices._staticInstance.set_jsonpCallbackParameter(value); }
Hepsiburada.Services.ForumServices.get_jsonpCallbackParameter = function() { 
/// <value type="String">Specifies the parameter name that contains the callback function name for a JSONP request.</value>
return Hepsiburada.Services.ForumServices._staticInstance.get_jsonpCallbackParameter(); }
Hepsiburada.Services.ForumServices.set_path("/Services/ForumServices.asmx");
Hepsiburada.Services.ForumServices.CreateTopic= function(forumID,topicHeader,messageText,onSuccess,onFailed,userContext) {
/// <param name="forumID" type="Number">System.Int32</param>
/// <param name="topicHeader" type="String">System.String</param>
/// <param name="messageText" type="String">System.String</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
Hepsiburada.Services.ForumServices._staticInstance.CreateTopic(forumID,topicHeader,messageText,onSuccess,onFailed,userContext); }
Hepsiburada.Services.ForumServices.CreateMessage= function(topicID,replyToMessageID,messageText,onSuccess,onFailed,userContext) {
/// <param name="topicID" type="Number">System.Int32</param>
/// <param name="replyToMessageID" type="Number">System.Int32</param>
/// <param name="messageText" type="String">System.String</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
Hepsiburada.Services.ForumServices._staticInstance.CreateMessage(topicID,replyToMessageID,messageText,onSuccess,onFailed,userContext); }
Hepsiburada.Services.ForumServices.DeleteItem= function(itemID,mode,onSuccess,onFailed,userContext) {
/// <param name="itemID" type="Number">System.Int32</param>
/// <param name="mode" type="Hepsiburada.Forum.Controls.RemoveItem_RemoveItemMode">Hepsiburada.Forum.Controls.RemoveItem+RemoveItemMode</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
Hepsiburada.Services.ForumServices._staticInstance.DeleteItem(itemID,mode,onSuccess,onFailed,userContext); }
Hepsiburada.Services.ForumServices.Complain= function(mode,ItemID,resultBoxStyle,onSuccess,onFailed,userContext) {
/// <param name="mode" type="Hepsiburada.Forum.Controls.Complaint_ComplaintMode">Hepsiburada.Forum.Controls.Complaint+ComplaintMode</param>
/// <param name="ItemID" type="Number">System.Int32</param>
/// <param name="resultBoxStyle" type="String">System.String</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
Hepsiburada.Services.ForumServices._staticInstance.Complain(mode,ItemID,resultBoxStyle,onSuccess,onFailed,userContext); }
Hepsiburada.Services.ForumServices.RateMessage= function(messageID,ratingValue,onSuccess,onFailed,userContext) {
/// <param name="messageID" type="Number">System.Int32</param>
/// <param name="ratingValue" type="Number">System.Byte</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
Hepsiburada.Services.ForumServices._staticInstance.RateMessage(messageID,ratingValue,onSuccess,onFailed,userContext); }
Hepsiburada.Services.ForumServices.GetForumTopics= function(forumID,pageNumber,controlWidth,onSuccess,onFailed,userContext) {
/// <param name="forumID" type="Number">System.Int32</param>
/// <param name="pageNumber" type="Number">System.Int32</param>
/// <param name="controlWidth" type="String">System.String</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
Hepsiburada.Services.ForumServices._staticInstance.GetForumTopics(forumID,pageNumber,controlWidth,onSuccess,onFailed,userContext); }
Hepsiburada.Services.ForumServices.GetTopicMessages= function(topicID,pageNumber,controlWidth,highLightLastMessage,scrollToLastMessage,onSuccess,onFailed,userContext) {
/// <param name="topicID" type="Number">System.Int32</param>
/// <param name="pageNumber" type="Number">System.Int32</param>
/// <param name="controlWidth" type="String">System.String</param>
/// <param name="highLightLastMessage" type="Boolean">System.Boolean</param>
/// <param name="scrollToLastMessage" type="Boolean">System.Boolean</param>
/// <param name="succeededCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="failedCallback" type="Function" optional="true" mayBeNull="true"></param>
/// <param name="userContext" optional="true" mayBeNull="true"></param>
Hepsiburada.Services.ForumServices._staticInstance.GetTopicMessages(topicID,pageNumber,controlWidth,highLightLastMessage,scrollToLastMessage,onSuccess,onFailed,userContext); }
Type.registerNamespace('Hepsiburada.Forum.Controls');
if (typeof(Hepsiburada.Forum.Controls.RemoveItemMode) === 'undefined') {
Hepsiburada.Forum.Controls.RemoveItemMode = function() { throw Error.invalidOperation(); }
Hepsiburada.Forum.Controls.RemoveItemMode.prototype = {None: 0,Message: 1,Topic: 2}
Hepsiburada.Forum.Controls.RemoveItemMode.registerEnum('Hepsiburada.Forum.Controls.RemoveItemMode', true);
}
if (typeof(Hepsiburada.Forum.Controls.ComplaintMode) === 'undefined') {
Hepsiburada.Forum.Controls.ComplaintMode = function() { throw Error.invalidOperation(); }
Hepsiburada.Forum.Controls.ComplaintMode.prototype = {Auto: 0,Message: 1,Topic: 2}
Hepsiburada.Forum.Controls.ComplaintMode.registerEnum('Hepsiburada.Forum.Controls.ComplaintMode', true);
}
