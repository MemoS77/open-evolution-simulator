import Engine2d from "../engine2d"
import EngineInfo from "../../types/engine-info"
import {Planet, SpaceConf} from "./types"
import defParams from "./def-params"

export default class SpaceGravityEngine extends Engine2d {

    planets: Planet[] = []



    getInfo(): EngineInfo {
        return {
            id: "gravity",
            name: "Space Gravity Simulator",
            version: 1,
            description: "Show, how gravity works in 2d space"
        }
    }

    draw(): void {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.strokeStyle = "gray"
        this.ctx.setLineDash([5, 10])
        this.ctx.lineWidth = 1
        this.ctx.strokeRect(this.camera.x, this.camera.y, this.params!.size.x, this.params!.size.y)

        const twoPi = 2 * Math.PI
        this.planets.forEach(planet => {
            this.ctx.fillStyle = planet.color
            this.ctx.beginPath()
            this.ctx.arc(planet.position.x+this.camera.x, planet.position.y+this.camera.y, planet.radius, 0, twoPi)
            this.ctx.fill()
        })

    }

    nextStep(): void {
        const cnt = this.planets.length
        for (let i=0; i<cnt; i++) {
            const planet = this.planets[i]
            if (!planet.exists) continue
            for (let j=0; j<cnt; j++) {
                if (i==j) continue
                const other = this.planets[j]
                if (!other.exists) continue
                const dx = other.position.x - planet.position.x
                const dy = other.position.y - planet.position.y
                const dist = Math.sqrt(dx*dx+dy*dy)
                if (dist < (planet.radius + other.radius)) {
                    planet.mass += other.mass
                    planet.radius = this.calcRadius(planet.mass)
                    planet.velocity.x = (planet.velocity.x * planet.mass + other.velocity.x * other.mass) / (planet.mass + other.mass)
                    planet.velocity.y = (planet.velocity.y * planet.mass + other.velocity.y * other.mass) / (planet.mass + other.mass)
                    other.exists = false
                } else {
                    const force = other.mass / (dist * dist)
                    const fx = force * dx / dist
                    const fy = force * dy / dist
                    planet.velocity.x += fx
                    planet.velocity.y += fy
                }
            }
        }

        this.planets = this.planets.filter(planet => planet.exists)

        this.planets.forEach(planet => {
            planet.position.x += planet.velocity.x
            planet.position.y += planet.velocity.y
            if (planet.position.x<0) planet.position.x = this.params!.size.x!
            if (planet.position.y<0) planet.position.y = this.params!.size.y!
            if (planet.position.x>this.params!.size.x!) planet.position.x = 0
            if (planet.position.y>this.params!.size.y!) planet.position.y = 0
        })
    }

    calcRadius(mass: number): number {
        return Math.pow(mass, 0.33)
    }

    reset(): void {
        this.planets = []
        if (!this.params) this.params = defParams
        const cnt = this.params.count!
        const maxX = this.params.size.x
        const maxY = this.params.size.y
        const conf = this.params.conf as SpaceConf
        const maxMass = conf.maxMass
        for (let i=0; i<cnt; i++) {
            const mass = Math.random() * maxMass
            this.planets.push({
                position: {
                    x: Math.random() * maxX,
                    y: Math.random() * maxY,
                },
                color: `rgb(${Math.random()*100+155}, ${Math.random()*100+155}, ${Math.random()*100+155})`,
                velocity: {x: 0, y: 0},
                mass,
                radius: this.calcRadius(mass),
                exists: true
            })
        }


        //
    }



}