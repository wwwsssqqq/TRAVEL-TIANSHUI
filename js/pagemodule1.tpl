<%
if(pageCount < 1){
return "";
}
if(prevText && (currentIndex > 0 || prevShowAlways)){%>
<li pageIndex="<%=currentIndex-1%>" class="<%=currentIndex == 0 ? 'disabled' : ''%>"><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true"><%=prevText%></span></a></li>
<%}
if (interval[0] > 0 && edgeEntriesCount > 0){
var end = Math.min(edgeEntriesCount, interval[0]);
for(var i=0; i<end; i++) {%>
<li pageIndex="<%=i%>" class="<%=currentIndex == i ? 'active' : ''%>"><a href="javascript:void(0)"><%=i+1%></a></li>
<%}
if(edgeEntriesCount < interval[0] && ellipseText){%>
<li class="disabled"><span><%=ellipseText%></span></li>
<%}
}
for(var i=interval[0]; i<interval[1]; i++) {%>
<li pageIndex="<%=i%>" class="<%=currentIndex == i ? 'active' : ''%>"><a href="javascript:void(0)"><%=i+1%></a></li>
<%}
if (interval[1] < pageCount && edgeEntriesCount > 0){
if(pageCount-edgeEntriesCount > interval[1] && ellipseText){%>
<li class="disabled"><span><%=ellipseText%></span></li>
<%}
var begin = Math.max(pageCount-edgeEntriesCount, interval[1]);
for(var i = begin; i< pageCount; i++) {%>
<li pageIndex="<%=i%>" class="<%=currentIndex == i ? 'active' : ''%>"><a href="javascript:void(0)"><%=i+1%></a></li>
<%}

}
if(nextText && (currentIndex < pageCount-1 || nextShowAlways)){%>
<li pageIndex="<%=currentIndex+1%>" class="<%=currentIndex == pageCount-1 ? 'disabled' : ''%>"><a href="javascript:void(0)" aria-label="Next"><span aria-hidden="true"><%=nextText%></span></a></li>
<%}%>