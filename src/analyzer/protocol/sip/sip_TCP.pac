# BinPAC file for SIP over TCP
# Based heavily on the HTTP BinPAC analyzer

%include binpac.pac
%include bro.pac

%extern{
#include "events.bif.h"
%}

analyzer SIP_TCP withcontext {
	connection:	 SIP_Conn;
	flow:		 SIP_Flow;
};

connection SIP_Conn(bro_analyzer: BroAnalyzer) {
	upflow = SIP_Flow(true);
	downflow = SIP_Flow(false);
};  

%include sip-protocol.pac

flow SIP_Flow(is_orig: bool) {
	datagram = SIP_PDU(is_orig) withcontext(connection, this);
};

%include sip-analyzer.pac
