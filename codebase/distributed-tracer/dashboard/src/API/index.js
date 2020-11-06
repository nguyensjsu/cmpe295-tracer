export const fetchTraceIDs = function () {
    return new Promise(res => res([
        {
            url: "POST /cart",
            id: "JHBJDSFBBWERASJNCKCBSCKASCAJLdancm1",
            timestamp: new Date()
        },
        {
            url: "GET /cart",
            id: "JHBJDSFBBWERASJNCKCBSCKASCAJLdancm2",
            timestamp: new Date()
        },
        {
            url: "POST /buy",
            id: "JHBJDSFBBWERASJNCKCBSCKASCAJLdancm3",
            timestamp: new Date()
        },
        {
            url: "GET /buy",
            id: "JHBJDSFBBWERASJNCKCBSCKASCAJLdancm4",
            timestamp: new Date()
        },
        {
            url: "POST /cart",
            id: "JHBJDSFBBWERASJNCKCBSCKASCAJLdancm5",
            timestamp: new Date()
        },
        {
            url: "POST /cart",
            id: "JHBJDSFBBWERASJNCKCBSCKASCAJLdancm6",
            timestamp: new Date()
        }
    ]))
}

export const fetchLogs = async (uuid) => [
    {
        source: "A",
        destination: "B",
        type: "u",
        hash: "hash1",
        timestamp: new Date()
    },
    {
        source: "A",
        destination: "B",
        type: "u",
        hash: "hash1",
        timestamp: new Date()
    },

]