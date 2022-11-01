class SESRawMessage {
    /**
     * @type {{files:{ content: string | Buffer name:string, mimetype: string, createdAt: string}[], to: String | String[] | {name: String, address: String}[], from: string, subject: string, html: string, text: string}}
     */
    data = {
        from: null,
        to: [],
        subject: null,
        html: null,
        text: null,
        files: [],
    };
    /**
     * 
     * @param {{files:{content: string | Buffer, name:string, mimetype: string, createdAt: string}[], to: String | String[] | {name: String, address: String}[], from: string, subject: string, html: string, text: string}} data
     */
    constructor(data = {}) {
        this.data = {...this.data, ...data}
    }

    setFrom(value){
        this.data.from = value;
    }

    setTo(value){
        this.data.from = value;
    }
    setHtml(value) {
        this.data.html = value;
    }

    setText(value) {
        this.data.html = value;
    }

    build() {
        this.performValidation()
        const boundary = makeid(64);
        let parts = [];
        parts =  [...parts, this.getHeaders(boundary), '\n', `--${boundary}`];
        // console.log("parts1:", parts)
        parts = [...parts, ...this.getEnvelop(boundary), '\n', `--${boundary}`];
        // console.log("parts2:", parts)
        if(this.data.files.length) {
            parts = [...parts, ...this.attachements(boundary)]
            // console.log("parts3:", parts)
        }
        parts = [...parts, '\n', `--${boundary}--`]
        return parts;
    }

    buildBuffer() {
        console.log(this.build())
        return Buffer.from(this.build(),'ascii');
    }

    getHeaders(boundary) {
        const {to, from, subject} = this.data;
        let headers =  {
            From: from,
            To: makeTo(to),
            Subject: subject,
            "MIME-Version": 1.0,
            Date: new Date(),
            "Content-Type": `mulitpart/alternative; boundary="${boundary}"`
        }
        return headerToString(headers);
    }

    getEnvelop(boundary) {
        const {html, text} = this.data;

        const parsedhtml = html.length? [
            headerToString({
                "Content-Type": "text/html; charset=UTF-8",
                "Content-Transfer-Encoding": "7bit",
            }),
            html
        ].join('\n'): ''

        const parsedText = text.length? [
            headerToString({
                "Content-Type": "text/plain; charset=UTF-8",
                "Content-Transfer-Encoding": "7bit",
            }),
            text
        ].join('\n'):'';
        const body = [parsedText, parsedhtml].filter(item=>item.length)

        return body.length > 1? [parsedText, '\n', `--${boundary}`, parsedhtml]: body;

    }

    performValidation() {
        const {to, from, subject, html, text} = this.data;
        if(to == null ){
            throw new Error("To cannot be empty")
        }
        if( from === null){
            throw new Error("From cannot be empty")
        }
        if(subject === null ){
            throw new Error("Mail Subject is required")
        }
        if(html === null && text === null){
            throw new Error("You have to provide a html body or text for the email")
        }
        
    }

    attachements(boundary) {
        if (!this.data.files.length) return '';
        const data = this.data.files.flatMap((item)=>{
            const name = item.name || makeid(16);
            const creationDate = item.createdAt || new Date()
            return [
                [
                    headerToString({
                    "Content-Type": `${item.mimetype}; name="${name}"`,
                    "Content-Description": name,
                    "Content-Disposition": `attachement;filename="${name}";\ncreation-date="${creationDate}"`,
                    "Content-Transfer-Encoding": "base64"
                    }),
                    `\n\n`,
                    typeof item.content === 'string'? item.content : item.content.toString('base64'),
                ].join('\n')
               , `--${boundary}`
            ]
        })
        return data;
    }
}

/**
 * 
 * @param {String | String[] | {name: String, address: String}[]} to 
 * @return {String}
 */
function makeTo(to) {
    if(typeof to === 'string') return to;

    return to.map((item)=>
        item.name === undefined ? item: `"${item.name}" <${item.address}>`
    ).join(', ');
}

/**
 * 
 * @param {{[key:string]: any}} value 
 * @return {String}
 */
function headerToString(value) {
    return Object.keys(value).map((key)=>`${key}: ${value[key]}`).join('\n');
}

/**
 * 
 * @param {Number} length 
 * @returns {String}
 */
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = SESRawMessage;