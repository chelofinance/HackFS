export const invoiceXMLString = `<?xml version="1.0" encoding="UTF-8"?><invoice:invoiceMessage xmlns:invoice="urn:gs1:ecom:invoice:xsd:3" xmlns:eanucc="urn:ean.ucc:2" xmlns:sh="http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:gs1:ecom:invoice:xsd:3 ../Schemas/gs1/ecom/Invoice.xsd">
    <sh:StandardBusinessDocumentHeader>
		<sh:HeaderVersion>1.0</sh:HeaderVersion>
		<sh:Sender>
			<sh:Identifier Authority="GS1"/>
			<sh:ContactInformation>
				<sh:Contact>John Doe</sh:Contact>
				<sh:EmailAddress>John_Doe@purchasing.XYZretailer.com</sh:EmailAddress>
				<sh:FaxNumber>+1-212-555-1213</sh:FaxNumber>
				<sh:TelephoneNumber>+1-212-555-2122</sh:TelephoneNumber>
				<sh:ContactTypeIdentifier>Buyer</sh:ContactTypeIdentifier>
			</sh:ContactInformation>
		</sh:Sender>
		<sh:Receiver>
			<sh:Identifier Authority="GS1"/>
			<sh:ContactInformation>
				<sh:Contact>Mary Smith</sh:Contact>
				<sh:EmailAddress>Mary_Smith@widgets.com</sh:EmailAddress>
				<sh:FaxNumber>+1-312-555-1214</sh:FaxNumber>
				<sh:TelephoneNumber>+1-312-555-2125</sh:TelephoneNumber>
				<sh:ContactTypeIdentifier>Seller</sh:ContactTypeIdentifier>
			</sh:ContactInformation>
		</sh:Receiver>
		<sh:DocumentIdentification>
			<sh:Standard>GS1</sh:Standard>
			<sh:TypeVersion>3.5.1</sh:TypeVersion>
			<sh:InstanceIdentifier>100002</sh:InstanceIdentifier>
			<sh:Type/>
			<sh:MultipleType>false</sh:MultipleType>
			<sh:CreationDateAndTime>2006-01-10T12:00:01.000-05:00</sh:CreationDateAndTime>
		</sh:DocumentIdentification>
	</sh:StandardBusinessDocumentHeader>
    <invoice>
        <creationDateTime>2011-04-12T10:15:00.000-05:00</creationDateTime>
        <documentStatusCode>ORIGINAL</documentStatusCode>
        <invoiceIdentification>
            <entityIdentification>IN11-548</entityIdentification>
            <contentOwner>
                <gln>4098765000010</gln>
            </contentOwner>
        </invoiceIdentification>
        <digitalSignature>
   <Signature xmlns="http://www.w3.org/2000/09/xmldsig#" xsi:schemaLocation="http://www.w3.org/2000/09/xmldsig# ../Schemas/xmldsig/xmldsig-core-schema.xsd">
      <SignedInfo>
         <CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>
         <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#dsa-sha1"/>
         <Reference URI="http://example.org">
            <Transforms>
               <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
            </Transforms>
            <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>
            <DigestValue>K8M/lPbKnuMDsO0Uzuj75lQtzQI=</DigestValue>
         </Reference>
      </SignedInfo>
      <SignatureValue>
         DpEylhQoiUKBoKWmYfajXO7LZxiDYgVtUtCNyTgwZgoChzorA2nhkQ==
       </SignatureValue>
      <KeyInfo>
         <KeyValue>
            <DSAKeyValue>
               <P>
               rFto8uPQM6y34FLPmDh40BLJ1rVrC8VeRquuhPZ6jYNFkQuwxnu/wCvIAMhukPBLFET8bJf/b2ef+oqxZajEb+88zlZoyG8g/wMfDBHTxz+CnowLahnCCTYBp5kt7G8qUobJuvjylwj1st7V9Lsu03iXMXtbiriUjFa5gURasN8=
             </P>
               <Q>
               kEjAFpCe4lcUOdwphpzf+tBaUds=
             </Q>
               <G>
               oe14R2OtyKx+s+60O5BRNMOYpIg2TU/f15N3bsDErKOWtKXeNK9FS7dWStreDxo2SSgOonqAd4FuJ/4uva7GgNL4ULIqY7E+mW5iwJ7n/WTELh98mEocsLXkNh24HcH4BZfSCTruuzmCyjdV1KSqX/Eux04HfCWYmdxN3SQ/qqw=
             </G>
               <Y>
               pA5NnZvcd574WRXuOA7ZfC/7Lqt4cB0MRLWtHubtJoVOao9ib5ry4rTk0r6ddnOvAIGKktutzK3ymvKleS3DOrwZQgJ+/BDWDW8kO9R66o6rdjiSobBi/0c2V1+dkqOgjFmKz395mvCOZGhC7fqAVhHat2EjGPMfgSZyABa7+1k=
             </Y>
            </DSAKeyValue>
         </KeyValue>
         <X509Data>
            <X509Certificate>
             MIIDbTCCAyygAwIBAgIGAOCdrKxkMAkGByqGSM44BAMwezELMAkGA1UEBhMCSUUxDzANBgNVBAgTBkR1YmxpbjElMCMGA1UEChMcQmFsdGltb3JlIFRlY2hub2xvZ2llcywgTHRkLjERMA8GA1UECxMIWC9TZWN1cmUxITAfBgNVBAMTGFgvU2VjdXJlIDEwMjQtYml0IERTQSBDQTAeFw0wMDA3MjcxNzEzMzNaFw0wMTA3MjcxNzEzMjZaMHwxCzAJBgNVBAYTAklFMQ8wDQYDVQQIEwZEdWJsaW4xJTAjBgNVBAoTHEJhbHRpbW9yZSBUZWNobm9sb2dpZXMsIEx0ZC4xETAPBgNVBAsTCFgvU2VjdXJlMSIwIAYDVQQDExlYL1NlY3VyZSAxMDI0LWJpdCBEU0EgY3J0MIIBuDCCASwGByqGSM44BAEwggEfAoGBAKxbaPLj0DOst+BSz5g4eNASyda1awvFXkarroT2eo2DRZELsMZ7v8AryADIbpDwSxRE/GyX/29nn/qKsWWoxG/vPM5WaMhvIP8DHwwR08c/gp6MC2oZwgk2AaeZLexvKlKGybr48pcI9bLe1fS7LtN4lzF7W4q4lIxWuYFEWrDfAhUAkEjAFpCe4lcUOdwphpzf+tBaUdsCgYEAoe14R2OtyKx+s+60O5BRNMOYpIg2TU/f15N3bsDErKOWtKXeNK9FS7dWStreDxo2SSgOonqAd4FuJ/4uva7GgNL4ULIqY7E+mW5iwJ7n/WTELh98mEocsLXkNh24HcH4BZfSCTruuzmCyjdV1KSqX/Eux04HfCWYmdxN3SQ/qqwDgYUAAoGBAKQOTZ2b3Hee+FkV7jgO2Xwv+y6reHAdDES1rR7m7SaFTmqPYm+a8uK05NK+nXZzrwCBipLbrcyt8prypXktwzq8GUICfvwQ1g1vJDvUeuqOq3Y4kqGwYv9HNldfnZKjoIxZis9/eZrwjmRoQu36gFYR2rdhIxjzH4EmcgAWu/tZozswOTAPBgNVHQ8BAf8EBQMDAIAAMBEGA1UdDgQKBAiA4IML4dndEDATBgNVHSMEDDAKgAiHoMnYnDxZUDAJBgcqhkjOOAQDAzAAMC0CFQCEXa1E2ueJ8WMX5nP1lCcBWhxC2wIUGUCBb6M6Oj3NQAJbnZsdY63rKa0=
           </X509Certificate>
         </X509Data>
      </KeyInfo>
   </Signature>
   </digitalSignature>
        <invoiceType>INVOICE</invoiceType>
        <invoiceCurrencyCode>EUR</invoiceCurrencyCode>
        <buyer>
            <gln>5412345000013</gln>
        </buyer>
        <seller>
            <gln>4098765000010</gln>
        </seller>
        <invoiceTotals>
            <totalInvoiceAmount currencyCode="EUR">999.6</totalInvoiceAmount>
            <totalAmountInvoiceAllowancesCharges currencyCode="EUR">0</totalAmountInvoiceAllowancesCharges>
            <totalLineAmountInclusiveAllowancesCharges currencyCode="EUR">999.6</totalLineAmountInclusiveAllowancesCharges>
            <totalTaxAmount currencyCode="EUR">159.6</totalTaxAmount>
            <taxSubtotal>
                <dutyFeeTaxAmount currencyCode="EUR">159.6</dutyFeeTaxAmount>
                <dutyFeeTaxBasisAmount currencyCode="EUR">840</dutyFeeTaxBasisAmount>
                <dutyFeeTaxCategoryCode>STANDARD_RATE</dutyFeeTaxCategoryCode>
                <dutyFeeTaxPercentage>19.00</dutyFeeTaxPercentage>
                <dutyFeeTaxTypeCode>VALUE_ADDED_TAX</dutyFeeTaxTypeCode>
            </taxSubtotal>
        </invoiceTotals>
        <invoiceLineItem>
            <lineItemNumber>1</lineItemNumber>
            <invoicedQuantity>48</invoicedQuantity>
            <amountInclusiveAllowancesCharges currencyCode="EUR">480</amountInclusiveAllowancesCharges>
            <itemPriceInclusiveAllowancesCharges currencyCode="EUR">10</itemPriceInclusiveAllowancesCharges>
            <transferOfOwnershipDate>2011-04-11</transferOfOwnershipDate>
            <transactionalTradeItem>
                <gtin>40987650000223</gtin>
            </transactionalTradeItem>
            <invoiceLineTaxInformation>
                <dutyFeeTaxAmount currencyCode="EUR">91.2</dutyFeeTaxAmount>
                <dutyFeeTaxBasisAmount currencyCode="EUR">480</dutyFeeTaxBasisAmount>
                <dutyFeeTaxCategoryCode>STANDARD_RATE</dutyFeeTaxCategoryCode>
                <dutyFeeTaxPercentage>19.00</dutyFeeTaxPercentage>
                <dutyFeeTaxTypeCode>VALUE_ADDED_TAX</dutyFeeTaxTypeCode>
            </invoiceLineTaxInformation>
            <invoiceLineItemInformationAfterTaxes>
            	<amountInclusiveAllowancesCharges currencyCode="EUR">571.2</amountInclusiveAllowancesCharges>
            </invoiceLineItemInformationAfterTaxes>
            <purchaseOrder>
            	<entityIdentification>PO3352</entityIdentification>
        		<creationDateTime>2011-03-11T11:00:00.000-05:00</creationDateTime>
            	<lineItemNumber>1</lineItemNumber>
            </purchaseOrder>
        </invoiceLineItem>
        <invoiceLineItem>
            <lineItemNumber>2</lineItemNumber>
            <invoicedQuantity>24</invoicedQuantity>
            <amountInclusiveAllowancesCharges currencyCode="EUR">360</amountInclusiveAllowancesCharges>
            <itemPriceInclusiveAllowancesCharges currencyCode="EUR">15</itemPriceInclusiveAllowancesCharges>
            <transferOfOwnershipDate>2011-04-11</transferOfOwnershipDate>
            <transactionalTradeItem>
                <gtin>40987650000346</gtin>
            </transactionalTradeItem>
            <invoiceLineTaxInformation>
                <dutyFeeTaxAmount currencyCode="EUR">68.4</dutyFeeTaxAmount>
                <dutyFeeTaxBasisAmount currencyCode="EUR">360</dutyFeeTaxBasisAmount>
                <dutyFeeTaxCategoryCode>STANDARD_RATE</dutyFeeTaxCategoryCode>
                <dutyFeeTaxPercentage>19.00</dutyFeeTaxPercentage>
                <dutyFeeTaxTypeCode>VALUE_ADDED_TAX</dutyFeeTaxTypeCode>
                <extension/>
            </invoiceLineTaxInformation>
            <invoiceLineItemInformationAfterTaxes>
            	<amountInclusiveAllowancesCharges currencyCode="EUR">571.2</amountInclusiveAllowancesCharges>
            </invoiceLineItemInformationAfterTaxes>
            <purchaseOrder>
            	<entityIdentification>PO3352</entityIdentification>
        		<creationDateTime>2011-03-11T11:00:00.000-05:00</creationDateTime>
            	<lineItemNumber>1</lineItemNumber>
            </purchaseOrder>
        </invoiceLineItem>
    </invoice>
</invoice:invoiceMessage>
`;

export const getInvoiceJson = ({
    currency,
    issuer_contact,
    issuer_email,
    receiver_contact,
    receiver_email,
    principal,
}: {
    currency: string;
    principal: string;
    issuer_contact: string;
    issuer_email: string;
    receiver_email: string;
    receiver_contact: string;
}) => ({
    declaration: {
        attributes: {
            version: "1.0",
            encoding: "UTF-8",
        },
    },
    elements: [
        {
            type: "element",
            name: "invoice:invoiceMessage",
            attributes: {
                "xmlns:invoice": "urn:gs1:ecom:invoice:xsd:3",
                "xmlns:eanucc": "urn:ean.ucc:2",
                "xmlns:sh": "http://www.unece.org/cefact/namespaces/StandardBusinessDocumentHeader",
                "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                "xsi:schemaLocation": "urn:gs1:ecom:invoice:xsd:3 ../Schemas/gs1/ecom/Invoice.xsd",
            },
            elements: [
                {
                    type: "element",
                    name: "sh:StandardBusinessDocumentHeader",
                    elements: [
                        {
                            type: "element",
                            name: "sh:HeaderVersion",
                            elements: [
                                {
                                    type: "text",
                                    text: "1.0",
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "sh:Sender",
                            elements: [
                                {
                                    type: "element",
                                    name: "sh:Identifier",
                                    attributes: {
                                        Authority: "GS1",
                                    },
                                },
                                {
                                    type: "element",
                                    name: "sh:ContactInformation",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "sh:Contact",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: issuer_contact,
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "sh:EmailAddress",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: issuer_email,
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "sh:FaxNumber",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "sh:TelephoneNumber",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "sh:ContactTypeIdentifier",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "Buyer",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "sh:Receiver",
                            elements: [
                                {
                                    type: "element",
                                    name: "sh:Identifier",
                                    attributes: {
                                        Authority: "GS1",
                                    },
                                },
                                {
                                    type: "element",
                                    name: "sh:ContactInformation",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "sh:Contact",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: receiver_contact,
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "sh:EmailAddress",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: receiver_email,
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "sh:FaxNumber",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "sh:TelephoneNumber",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "sh:ContactTypeIdentifier",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "Seller",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "sh:DocumentIdentification",
                            elements: [
                                {
                                    type: "element",
                                    name: "sh:Standard",
                                    elements: [
                                        {
                                            type: "text",
                                            text: "GS1",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "sh:TypeVersion",
                                    elements: [
                                        {
                                            type: "text",
                                            text: "3.5.1",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "sh:InstanceIdentifier",
                                    elements: [
                                        {
                                            type: "text",
                                            text: "100002",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "sh:Type",
                                },
                                {
                                    type: "element",
                                    name: "sh:MultipleType",
                                    elements: [
                                        {
                                            type: "text",
                                            text: "false",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "sh:CreationDateAndTime",
                                    elements: [
                                        {
                                            type: "text",
                                            text: new Date(Date.now()).toUTCString(),
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "element",
                    name: "invoice",
                    elements: [
                        {
                            type: "element",
                            name: "creationDateTime",
                            elements: [
                                {
                                    type: "text",
                                    text: new Date(Date.now()).toUTCString(),
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "documentStatusCode",
                            elements: [
                                {
                                    type: "text",
                                    text: "ORIGINAL",
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "invoiceIdentification",
                            elements: [
                                {
                                    type: "element",
                                    name: "entityIdentification",
                                    elements: [
                                        {
                                            type: "text",
                                            text: "IN11-548",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "contentOwner",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "gln",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "4098765000010",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "digitalSignature",
                            elements: [
                                {
                                    type: "element",
                                    name: "Signature",
                                    attributes: {
                                        xmlns: "http://www.w3.org/2000/09/xmldsig#",
                                        "xsi:schemaLocation":
                                            "http://www.w3.org/2000/09/xmldsig# ../Schemas/xmldsig/xmldsig-core-schema.xsd",
                                    },
                                    elements: [
                                        {
                                            type: "element",
                                            name: "SignedInfo",
                                            elements: [
                                                {
                                                    type: "element",
                                                    name: "CanonicalizationMethod",
                                                    attributes: {
                                                        Algorithm:
                                                            "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
                                                    },
                                                },
                                                {
                                                    type: "element",
                                                    name: "SignatureMethod",
                                                    attributes: {
                                                        Algorithm:
                                                            "http://www.w3.org/2000/09/xmldsig#dsa-sha1",
                                                    },
                                                },
                                                {
                                                    type: "element",
                                                    name: "Reference",
                                                    attributes: {
                                                        URI: "http://example.org",
                                                    },
                                                    elements: [
                                                        {
                                                            type: "element",
                                                            name: "Transforms",
                                                            elements: [
                                                                {
                                                                    type: "element",
                                                                    name: "Transform",
                                                                    attributes: {
                                                                        Algorithm:
                                                                            "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
                                                                    },
                                                                },
                                                            ],
                                                        },
                                                        {
                                                            type: "element",
                                                            name: "DigestMethod",
                                                            attributes: {
                                                                Algorithm:
                                                                    "http://www.w3.org/2000/09/xmldsig#sha1",
                                                            },
                                                        },
                                                        {
                                                            type: "element",
                                                            name: "DigestValue",
                                                            elements: [
                                                                {
                                                                    type: "text",
                                                                    text: "K8M/lPbKnuMDsO0Uzuj75lQtzQI=",
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "SignatureValue",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "\n         DpEylhQoiUKBoKWmYfajXO7LZxiDYgVtUtCNyTgwZgoChzorA2nhkQ==\n       ",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "KeyInfo",
                                            elements: [
                                                {
                                                    type: "element",
                                                    name: "KeyValue",
                                                    elements: [
                                                        {
                                                            type: "element",
                                                            name: "DSAKeyValue",
                                                            elements: [
                                                                {
                                                                    type: "element",
                                                                    name: "P",
                                                                    elements: [
                                                                        {
                                                                            type: "text",
                                                                            text: "\n               rFto8uPQM6y34FLPmDh40BLJ1rVrC8VeRquuhPZ6jYNFkQuwxnu/wCvIAMhukPBLFET8bJf/b2ef+oqxZajEb+88zlZoyG8g/wMfDBHTxz+CnowLahnCCTYBp5kt7G8qUobJuvjylwj1st7V9Lsu03iXMXtbiriUjFa5gURasN8=\n             ",
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    type: "element",
                                                                    name: "Q",
                                                                    elements: [
                                                                        {
                                                                            type: "text",
                                                                            text: "\n               kEjAFpCe4lcUOdwphpzf+tBaUds=\n             ",
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    type: "element",
                                                                    name: "G",
                                                                    elements: [
                                                                        {
                                                                            type: "text",
                                                                            text: "\n               oe14R2OtyKx+s+60O5BRNMOYpIg2TU/f15N3bsDErKOWtKXeNK9FS7dWStreDxo2SSgOonqAd4FuJ/4uva7GgNL4ULIqY7E+mW5iwJ7n/WTELh98mEocsLXkNh24HcH4BZfSCTruuzmCyjdV1KSqX/Eux04HfCWYmdxN3SQ/qqw=\n             ",
                                                                        },
                                                                    ],
                                                                },
                                                                {
                                                                    type: "element",
                                                                    name: "Y",
                                                                    elements: [
                                                                        {
                                                                            type: "text",
                                                                            text: "\n               pA5NnZvcd574WRXuOA7ZfC/7Lqt4cB0MRLWtHubtJoVOao9ib5ry4rTk0r6ddnOvAIGKktutzK3ymvKleS3DOrwZQgJ+/BDWDW8kO9R66o6rdjiSobBi/0c2V1+dkqOgjFmKz395mvCOZGhC7fqAVhHat2EjGPMfgSZyABa7+1k=\n             ",
                                                                        },
                                                                    ],
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                                {
                                                    type: "element",
                                                    name: "X509Data",
                                                    elements: [
                                                        {
                                                            type: "element",
                                                            name: "X509Certificate",
                                                            elements: [
                                                                {
                                                                    type: "text",
                                                                    text: "\n             MIIDbTCCAyygAwIBAgIGAOCdrKxkMAkGByqGSM44BAMwezELMAkGA1UEBhMCSUUxDzANBgNVBAgTBkR1YmxpbjElMCMGA1UEChMcQmFsdGltb3JlIFRlY2hub2xvZ2llcywgTHRkLjERMA8GA1UECxMIWC9TZWN1cmUxITAfBgNVBAMTGFgvU2VjdXJlIDEwMjQtYml0IERTQSBDQTAeFw0wMDA3MjcxNzEzMzNaFw0wMTA3MjcxNzEzMjZaMHwxCzAJBgNVBAYTAklFMQ8wDQYDVQQIEwZEdWJsaW4xJTAjBgNVBAoTHEJhbHRpbW9yZSBUZWNobm9sb2dpZXMsIEx0ZC4xETAPBgNVBAsTCFgvU2VjdXJlMSIwIAYDVQQDExlYL1NlY3VyZSAxMDI0LWJpdCBEU0EgY3J0MIIBuDCCASwGByqGSM44BAEwggEfAoGBAKxbaPLj0DOst+BSz5g4eNASyda1awvFXkarroT2eo2DRZELsMZ7v8AryADIbpDwSxRE/GyX/29nn/qKsWWoxG/vPM5WaMhvIP8DHwwR08c/gp6MC2oZwgk2AaeZLexvKlKGybr48pcI9bLe1fS7LtN4lzF7W4q4lIxWuYFEWrDfAhUAkEjAFpCe4lcUOdwphpzf+tBaUdsCgYEAoe14R2OtyKx+s+60O5BRNMOYpIg2TU/f15N3bsDErKOWtKXeNK9FS7dWStreDxo2SSgOonqAd4FuJ/4uva7GgNL4ULIqY7E+mW5iwJ7n/WTELh98mEocsLXkNh24HcH4BZfSCTruuzmCyjdV1KSqX/Eux04HfCWYmdxN3SQ/qqwDgYUAAoGBAKQOTZ2b3Hee+FkV7jgO2Xwv+y6reHAdDES1rR7m7SaFTmqPYm+a8uK05NK+nXZzrwCBipLbrcyt8prypXktwzq8GUICfvwQ1g1vJDvUeuqOq3Y4kqGwYv9HNldfnZKjoIxZis9/eZrwjmRoQu36gFYR2rdhIxjzH4EmcgAWu/tZozswOTAPBgNVHQ8BAf8EBQMDAIAAMBEGA1UdDgQKBAiA4IML4dndEDATBgNVHSMEDDAKgAiHoMnYnDxZUDAJBgcqhkjOOAQDAzAAMC0CFQCEXa1E2ueJ8WMX5nP1lCcBWhxC2wIUGUCBb6M6Oj3NQAJbnZsdY63rKa0=\n           ",
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "invoiceType",
                            elements: [
                                {
                                    type: "text",
                                    text: "INVOICE",
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "invoiceCurrencyCode",
                            elements: [
                                {
                                    type: "text",
                                    text: currency,
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "buyer",
                            elements: [
                                {
                                    type: "element",
                                    name: "gln",
                                    elements: [
                                        {
                                            type: "text",
                                            text: "5412345000013",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "seller",
                            elements: [
                                {
                                    type: "element",
                                    name: "gln",
                                    elements: [
                                        {
                                            type: "text",
                                            text: "4098765000010",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "invoiceTotals",
                            elements: [
                                {
                                    type: "element",
                                    name: "totalInvoiceAmount",
                                    attributes: {
                                        currencyCode: currency,
                                    },
                                    elements: [
                                        {
                                            type: "text",
                                            text: principal,
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "totalAmountInvoiceAllowancesCharges",
                                    attributes: {
                                        currencyCode: currency,
                                    },
                                    elements: [
                                        {
                                            type: "text",
                                            text: "0",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "totalLineAmountInclusiveAllowancesCharges",
                                    attributes: {
                                        currencyCode: currency,
                                    },
                                    elements: [
                                        {
                                            type: "text",
                                            text: principal,
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "totalTaxAmount",
                                    attributes: {
                                        currencyCode: currency,
                                    },
                                    elements: [
                                        {
                                            type: "text",
                                            text: "159.6",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "taxSubtotal",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxAmount",
                                            attributes: {
                                                currencyCode: currency,
                                            },
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "159.6",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxBasisAmount",
                                            attributes: {
                                                currencyCode: currency,
                                            },
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxCategoryCode",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "STANDARD_RATE",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxPercentage",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "19.00",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxTypeCode",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "VALUE_ADDED_TAX",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "invoiceLineItem",
                            elements: [
                                {
                                    type: "element",
                                    name: "lineItemNumber",
                                    elements: [
                                        {
                                            type: "text",
                                            text: "1",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "invoicedQuantity",
                                    elements: [
                                        {
                                            type: "text",
                                            text: "48",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "amountInclusiveAllowancesCharges",
                                    attributes: {
                                        currencyCode: currency,
                                    },
                                    elements: [
                                        {
                                            type: "text",
                                            text: "480",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "itemPriceInclusiveAllowancesCharges",
                                    attributes: {
                                        currencyCode: currency,
                                    },
                                    elements: [
                                        {
                                            type: "text",
                                            text: "10",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "transferOfOwnershipDate",
                                    elements: [
                                        {
                                            type: "text",
                                            text: new Date(Date.now()).toLocaleString("en-US"),
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "transactionalTradeItem",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "gtin",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "40987650000223",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "invoiceLineTaxInformation",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxAmount",
                                            attributes: {
                                                currencyCode: currency,
                                            },
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "91.2",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxBasisAmount",
                                            attributes: {
                                                currencyCode: currency,
                                            },
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "480",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxCategoryCode",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "STANDARD_RATE",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxPercentage",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "19.00",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxTypeCode",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "VALUE_ADDED_TAX",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "invoiceLineItemInformationAfterTaxes",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "amountInclusiveAllowancesCharges",
                                            attributes: {
                                                currencyCode: currency,
                                            },
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "571.2",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "purchaseOrder",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "entityIdentification",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "PO3352",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "creationDateTime",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: new Date(Date.now()).toUTCString(),
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "lineItemNumber",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "1",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "element",
                            name: "invoiceLineItem",
                            elements: [
                                {
                                    type: "element",
                                    name: "lineItemNumber",
                                    elements: [
                                        {
                                            type: "text",
                                            text: "2",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "invoicedQuantity",
                                    elements: [
                                        {
                                            type: "text",
                                            text: "24",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "amountInclusiveAllowancesCharges",
                                    attributes: {
                                        currencyCode: currency,
                                    },
                                    elements: [
                                        {
                                            type: "text",
                                            text: "360",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "itemPriceInclusiveAllowancesCharges",
                                    attributes: {
                                        currencyCode: currency,
                                    },
                                    elements: [
                                        {
                                            type: "text",
                                            text: "15",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "transferOfOwnershipDate",
                                    elements: [
                                        {
                                            type: "text",
                                            text: new Date(Date.now()).toLocaleString("en-US"),
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "transactionalTradeItem",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "gtin",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "40987650000346",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "invoiceLineTaxInformation",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxAmount",
                                            attributes: {
                                                currencyCode: currency,
                                            },
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "68.4",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxBasisAmount",
                                            attributes: {
                                                currencyCode: currency,
                                            },
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "360",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxCategoryCode",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "STANDARD_RATE",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxPercentage",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "19.00",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "dutyFeeTaxTypeCode",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "VALUE_ADDED_TAX",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "extension",
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "invoiceLineItemInformationAfterTaxes",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "amountInclusiveAllowancesCharges",
                                            attributes: {
                                                currencyCode: currency,
                                            },
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "571.2",
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    name: "purchaseOrder",
                                    elements: [
                                        {
                                            type: "element",
                                            name: "entityIdentification",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "PO3352",
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "creationDateTime",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: new Date(Date.now()).toUTCString(),
                                                },
                                            ],
                                        },
                                        {
                                            type: "element",
                                            name: "lineItemNumber",
                                            elements: [
                                                {
                                                    type: "text",
                                                    text: "1",
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
});
